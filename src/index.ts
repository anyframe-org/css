import type { ProcessedStyle, Property } from '@tenoxui/moxie'
import type { Values, Classes, Aliases } from '@tenoxui/types'
import type { Variants, Breakpoints, TenoxUIConfig } from './types'
import Moxie from '@tenoxui/moxie'
import { merge } from '@nousantx/someutils'

import { defaultVariants, defaultCustomVariants } from './lib/variant'
import { properties as defaultProperties } from './lib/property'
import { values as defaultValues } from './lib/value'

export class AnyCSS {
  private main: Moxie
  private prefixLoader: Moxie
  private engine: typeof Moxie
  private variants: Variants
  private customVariants: Property
  private property: Property
  private values: Values
  private classes: Classes
  private aliases: Aliases
  private breakpoints: Breakpoints
  private tabSize: number
  // private useLayer: boolean
  private tuiConfig: TenoxUIConfig

  constructor({
    sizing = 0.25,
    tabSize = 2,
    showLayerModifier = true,
    variants = {},
    customVariants = {},
    property = {},
    values = {},
    classes = {},
    aliases = {},
    breakpoints = {},
    moxie = Moxie
  } = {}) {
    /* utility */
    // this.useLayer = showLayerModifier
    this.tabSize = tabSize
    this.engine = moxie
    this.variants = { ...defaultVariants, ...variants }
    this.customVariants = customVariants
    this.breakpoints = {
      sm: '40rem',
      md: '48rem',
      lg: '64rem',
      xl: '80rem',
      '2xl': '96rem',
      ...breakpoints
    }
    /* tenoxui configuration */
    this.property = { ...defaultProperties({ sizing }), ...property }
    this.classes = classes
    this.aliases = aliases
    this.values = merge(defaultValues, values)

    this.tuiConfig = {
      property: this.property,
      values: this.values,
      classes: this.classes,
      aliases: this.aliases
    }
    /* engine */
    this.main = new this.engine(this.tuiConfig)
    this.prefixLoader = new this.engine({
      property: {
        ...defaultCustomVariants,
        ...this.customVariants
      },
      values: this.breakpoints
    })
  }

  /**
   * Utility
   */

  public addTabs(str: string, size: number = 2, fixedTabs: boolean = false): string {
    return str
      .split('\n')
      .filter(line => line.trim() !== '')
      .map(line => `${' '.repeat(fixedTabs ? size : this.tabSize)}${line}`)
      .join('\n')
  }

  public createEngine(inputConfig: Partial<TenoxUIConfig> = {}): Moxie {
    return new this.engine(merge(this.tuiConfig, inputConfig))
  }

  /**
   * Prefix Handler
   */

  private getPseudoSyntax(prefix: string) {
    return [
      'after',
      'backdrop',
      'before',
      'cue',
      'cue-region',
      'file-selector-button',
      'first-letter',
      'first-line',
      'grammar-error',
      'marker',
      'part',
      'placeholder',
      'selection',
      'slotted',
      'spelling-error',
      'target-text'
    ].includes(prefix)
      ? '::'
      : ':'
  }

  private getBreakpointQuery(prefix: string) {
    if (prefix.startsWith('min-')) {
      const breakpointName = prefix.substring(4)
      if (this.breakpoints[breakpointName]) {
        return `@media (width >= ${this.breakpoints[breakpointName]})`
      }
    } else if (prefix.startsWith('max-')) {
      const breakpointName = prefix.substring(4)
      if (this.breakpoints[breakpointName]) {
        return `@media (width < ${this.breakpoints[breakpointName]})`
      }
    } else if (this.breakpoints[prefix]) {
      return `@media (width >= ${this.breakpoints[prefix]})`
    }
    return null
  }

  private isCustomPrefix(prefix: string) {
    const parsed = this.prefixLoader.parse(prefix)
    if (!parsed) return null
    return parsed && parsed[1] && parsed[2]
  }

  private processCustomPrefix(prefix: string) {
    try {
      const processedItems = this.prefixLoader.process(prefix)
      if (processedItems?.length > 0) {
        return processedItems[0].cssRules
      }
    } catch (error) {
      console.error(`Failed to process prefix ${prefix}:`, error)
    }
    return null
  }

  /**
   * Main Generator
   */

  public generate(item: ProcessedStyle, custom?: boolean) {
    const { className, cssRules, value, prefix } = item
    const selector =
      (!custom ? '.' : '') +
      this.main.escapeCSSSelector(prefix ? `${prefix}:${className}` : `${className}`)
    const finalValue = value !== null ? `: ${value}` : ''

    if (!prefix) {
      return `${selector} {\n  ${cssRules}${finalValue}\n}`
    }

    // Handle complex prefixes
    if (this.isCustomPrefix(prefix)) {
      const moxieRule = this.processCustomPrefix(prefix)
      if (moxieRule && typeof moxieRule === 'string') {
        if (moxieRule.startsWith('value:')) {
          const actualRule = moxieRule.substring(6)

          if (actualRule.startsWith('@media')) {
            return `${selector} {\n  ${actualRule} {\n    ${cssRules}${finalValue}\n  }\n}`
          }

          return `${selector} {\n  ${actualRule} { ${cssRules}${finalValue} }\n}`
        }

        return `${selector} {\n  ${moxieRule} { ${cssRules}${finalValue} }\n}`
      }
    }

    // Handle direct prefix
    if (
      (prefix.startsWith('[') && prefix.endsWith(']')) ||
      (prefix.startsWith('(') && prefix.endsWith(')'))
    ) {
      return `${selector} {\n  ${this.prefixLoader.processValue(
        prefix,
        '',
        ''
      )} { ${cssRules}${finalValue} }\n}`
    }

    // Handle breakpoints
    const breakpointQuery = this.getBreakpointQuery(prefix)
    if (breakpointQuery) {
      return `${selector} {\n  ${breakpointQuery} {\n    ${cssRules}${finalValue}\n  }\n}`
    }

    // Handle variants
    if (this.variants[prefix]) {
      return `${selector} {\n  ${this.variants[prefix]} {\n    ${cssRules}${finalValue}\n  }\n}`
    }

    // Handle pseudo-elements/classes
    const pseudoSyntax = this.getPseudoSyntax(prefix)

    return `${selector} {\n  &${pseudoSyntax}${prefix} { ${cssRules}${finalValue} }\n}`
  }

  public render(classNames: string | string[]) {
    return this.main
      .process(classNames)
      .map(item => this.generate(item))
      .join('\n')
  }
}

export default AnyCSS
