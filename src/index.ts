import type { ProcessedStyle, Property } from '@tenoxui/moxie'
import type { Values, Classes, Aliases } from '@tenoxui/types'
import type { Variants, Breakpoints, TenoxUIConfig, Config } from './types'
import Moxie from '@tenoxui/moxie'
import { merge } from '@nousantx/someutils'

import { defaultVariants, defaultCustomVariants } from './lib/variant'
import { properties as defaultProperties } from './lib/property'
import { values as defaultValues } from './lib/value'
import { classes as defaultClasses } from './lib/classes'
import { alias as defaultAlias } from './lib/alias'
import { colorLib } from './lib/color'

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
  private tuiConfig: TenoxUIConfig

  constructor({
    sizing = 0.25,
    colorVariant = 'oklch',
    colors = {},
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
  }: Partial<Config> = {}) {
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

    this.property = { ...(defaultProperties({ sizing,  }) as Property), ...property }
    this.classes = merge(defaultClasses, classes)
    this.aliases = { ...defaultAlias, ...aliases }
    this.values = merge(
      colorLib({
        output: colorVariant,
        colors
      }),
      defaultValues,
      values
    )

    this.tuiConfig = {
      property: this.property,
      values: this.values,
      classes: this.classes,
      aliases: this.aliases
    }

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
   * Utility methods
   */
  public addTabs(str: string, size: number = 2, fixedTabs: boolean = false): string {
    const spaces = ' '.repeat(fixedTabs ? size : this.tabSize)
    return str
      .split('\n')
      .filter(line => line.trim() !== '')
      .map(line => `${spaces}${line}`)
      .join('\n')
  }

  public createEngine(inputConfig: Partial<TenoxUIConfig> = {}): Moxie {
    return new this.engine(merge(this.tuiConfig, inputConfig))
  }

  /**
   * Prefix handling methods
   */
  private getPseudoSyntax(prefix: string): string {
    const doubleColonPrefixes = [
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
    ]

    return doubleColonPrefixes.includes(prefix) ? '::' : ':'
  }

  private getBreakpointQuery(prefix: string): string | null {
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

  private isCustomPrefix(prefix: string): boolean {
    const parsed = this.prefixLoader.parse(prefix)
    return Boolean(parsed && parsed[1] && parsed[2])
  }

  private processCustomPrefix(prefix: string): string | string[] | null {
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
   * Formats CSS rules from cssRules and value
   */
  private formatRules(cssRules: string | string[], value: any): string {
    if (Array.isArray(cssRules) && value !== null) {
      return cssRules
        .map((prop: string) =>
          value
            ? `${this.main.toKebabCase(String(prop))}: ${value}`
            : this.main.toKebabCase(String(prop))
        )
        .join('; ')
    }
    return cssRules as string
  }

  /**
   * Creates the CSS selector string
   */
  private createSelector(
    className: string,
    prefix: string | null | undefined,
    custom?: boolean
  ): string {
    const selectorPrefix = custom ? '' : '.'
    const escapedClassName = this.main.escapeCSSSelector(
      prefix ? `${prefix}:${className}` : className
    )
    return `${selectorPrefix}${escapedClassName}`
  }

  /**
   * Generates the CSS wrapper based on prefix type
   */
  private generateCSSWrapper(prefix: string, rules: string, finalValue: string): string {
    // Handle custom prefixes
    if (this.isCustomPrefix(prefix)) {
      const moxieRule = this.processCustomPrefix(prefix)
      if (moxieRule && typeof moxieRule === 'string') {
        if (moxieRule.startsWith('value:')) {
          const actualRule = moxieRule.substring(6)

          if (actualRule.startsWith('@media')) {
            return `${actualRule} {\n    ${rules}${finalValue}\n  }`
          }
          return `${actualRule} { ${rules}${finalValue} }`
        }
        return `${moxieRule} { ${rules}${finalValue} }`
      }
    }

    // Handle direct prefix
    if (
      (prefix.startsWith('[') && prefix.endsWith(']')) ||
      (prefix.startsWith('(') && prefix.endsWith(')'))
    ) {
      return `${this.prefixLoader.processValue(prefix, '', '')} { ${rules}${finalValue} }`
    }

    // Handle breakpoints
    const breakpointQuery = this.getBreakpointQuery(prefix)
    if (breakpointQuery) {
      return `${breakpointQuery} {\n    ${rules}${finalValue}\n  }`
    }

    // Handle variants
    if (this.variants[prefix]) {
      return `${this.variants[prefix]} {\n    ${rules}${finalValue}\n  }`
    }

    // Handle pseudo-elements/classes
    const pseudoSyntax = this.getPseudoSyntax(prefix)
    return `&${pseudoSyntax}${prefix} { ${rules}${finalValue} }`
  }

  /**
   * Main Generator
   */
  public generate(item: ProcessedStyle, custom?: boolean): string {
    const { className, cssRules, value, prefix } = item
    const selector = this.createSelector(className, prefix, custom)
    const rules = this.formatRules(cssRules, value)
    const finalValue = Array.isArray(cssRules) || value === null ? '' : `: ${value}`

    if (!prefix) {
      return `${selector} {\n  ${rules}${finalValue}\n}`
    }

    const cssWrapper = this.generateCSSWrapper(prefix, rules, finalValue)
    return `${selector} {\n  ${cssWrapper}\n}`
  }

  public render(classNames: string | string[]): string {
    return this.main
      .process(classNames)
      .map(item => this.generate(item))
      .join('\n')
  }
}

export default AnyCSS
