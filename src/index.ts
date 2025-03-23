import type { ProcessedStyle, Property } from '@tenoxui/moxie'
import type { Values, Classes, Aliases } from '@tenoxui/types'
import type { Variants, Breakpoints, TenoxUIConfig, Config, ApplyStyleObject } from './types'
import Moxie from '@tenoxui/moxie'
import { merge } from '@nousantx/someutils'

import { defaultVariants, defaultCustomVariants } from './lib/variant'
import { properties as defaultProperties } from './lib/property'
import { values as defaultValues } from './lib/value'
import { classes as defaultClasses } from './lib/classes'
import { alias as defaultAlias } from './lib/alias'
import { colorLib } from './lib/color'
import { resetter, variables } from './style'

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
  private useResetter: boolean
  private useLayer: boolean
  private tabSize: number
  private tuiConfig: TenoxUIConfig
  private layerOrder: string[]
  private apply: ApplyStyleObject
  private themeConfig: ApplyStyleObject
  private baseConfig: ApplyStyleObject
  private componentsConfig: ApplyStyleObject
  private layers: Map<string, string>

  constructor({
    sizing = 0.25,
    colorVariant = 'oklch',
    colors = {},
    tabSize = 2,
    showLayerDirective = false,
    preflight = false,
    layerOrder = ['theme', 'base', 'components', 'utilities'],
    variants = {},
    customVariants = {},
    property = {},
    values = {},
    classes = {},
    aliases = {},
    breakpoints = {},
    apply = {},
    theme = {},
    base = {},
    components = {},
    moxie = Moxie,
    moxieOptions = {}
  }: Partial<Config> = {}) {
    this.tabSize = tabSize
    this.useLayer = showLayerDirective
    this.useResetter = preflight
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
    this.layerOrder = this.useResetter ? ['preflight', ...layerOrder] : layerOrder
    this.apply = apply
    this.themeConfig = theme
    this.baseConfig = base
    this.componentsConfig = components
    this.layers = new Map<string, string>([
      ['theme', ''],
      ['base', ''],
      ['components', ''],
      ['utilities', '']
    ])

    this.property = { ...(defaultProperties({ sizing }) as Property), ...property }
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
      ...moxieOptions,
      property: this.property,
      values: this.values,
      classes: this.classes
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
      .filter((line) => line.trim() !== '')
      .map((line) => `${spaces}${line}`)
      .join('\n')
  }

  public createEngine(inputConfig: Partial<TenoxUIConfig> = {}): Moxie {
    return new this.engine(merge(this.tuiConfig, inputConfig))
  }

  public generateRulesFromClass(classNames: string | string[]) {
    if (typeof classNames === 'string' && this.aliases[classNames]) {
      return this.main
        .process(this.aliases[classNames])
        .map((item) => this.generate(item, true))
        .join('\n')
    }

    return this.main
      .process(classNames)
      .map((item) => this.generate(item, true))
      .join('\n')
  }

  public getConfig() {
    return this.tuiConfig
  }

  public getLayerStyle() {
    return {
      base: this.baseConfig,
      theme: this.themeConfig,
      components: this.componentsConfig
    }
  }

  public getAliases(): Aliases {
    return this.aliases
  }

  public addAliases(newAliases: Aliases): this {
    this.aliases = { ...this.aliases, ...newAliases }
    return this
  }

  /**
   * Layer Modifier
   */

  public addLayer(layerName: string): this {
    if (!this.layers.has(layerName)) {
      this.layers.set(layerName, '')
      if (!this.layerOrder.includes(layerName)) {
        this.layerOrder.push(layerName)
      }
    }
    return this
  }

  public removeLayer(layerName: string): this {
    if (layerName !== 'base' && layerName !== 'theme') {
      this.layers.delete(layerName)
      this.layerOrder = this.layerOrder.filter((layer) => layer !== layerName)
    }
    return this
  }

  public setLayerOrder(order: string[]): this {
    const existingLayers = Array.from(this.layers.keys())
    const missingLayers = existingLayers.filter((layer) => !order.includes(layer))
    this.layerOrder = [...order, ...missingLayers]
    return this
  }

  /**
   * Prefix Handling Methods
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

  private formatRules(cssRules: string | string[], value: string | null): string {
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

  private generateCSSWrapper(
    prefix: string,
    rules: string,
    finalValue: string,
    indent: number = 0
  ): string {
    if (this.isCustomPrefix(prefix)) {
      const moxieRule = this.processCustomPrefix(prefix)
      if (moxieRule && typeof moxieRule === 'string') {
        if (moxieRule.startsWith('value:')) {
          const actualRule = moxieRule.substring(6)

          if (actualRule.startsWith('@media')) {
            return `${actualRule} {\n${rules}${finalValue}\n  }`
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
      return `${breakpointQuery} {\n${this.addTabs(rules + finalValue, this.tabSize, true)}\n}`
    }

    // Handle variants
    if (this.variants[prefix]) {
      return `${this.variants[prefix]} {\n${this.addTabs(rules + finalValue)}\n}`
    }

    // Handle pseudo-elements/classes
    const pseudoSyntax = this.getPseudoSyntax(prefix)
    return `&${pseudoSyntax}${prefix} { ${rules}${finalValue} }`
  }

  /**
   * Main Generator
   */

  private processApplyObject(obj: ApplyStyleObject, indentLevel: number = 0): string {
    let css = ''

    if (obj.SINGLE_RULE) {
      css += obj.SINGLE_RULE.join('\n') + '\n'
      delete obj.SINGLE_RULE
    }

    for (const key in obj) {
      const value = obj[key]
      css += key ? `${this.addTabs(key, this.tabSize * indentLevel, true)} {\n` : ''

      if (typeof value === 'string') {
        const rules = this.generateRulesFromClass(value)
        css += `${this.addTabs(rules, this.tabSize * (key ? indentLevel + 1 : indentLevel), true)}`
        if (rules.length) css += '\n'
      } else if (typeof value === 'object') {
        css += this.processApplyObject(value, indentLevel + 1)
      }

      css += key ? `${this.addTabs('}', this.tabSize * indentLevel, true)}\n` : ''
    }

    return css
  }

  public generate(item: ProcessedStyle, rulesOnly?: boolean, custom?: boolean): string {
    const { className, cssRules, value, prefix } = item
    const selector = this.createSelector(className, prefix, custom)
    const rules = this.formatRules(cssRules, value)
    const finalValue = Array.isArray(cssRules) || value === null ? '' : `: ${value}`

    if (!prefix) {
      return rulesOnly
        ? rules + finalValue + ';'
        : `${selector} {\n${this.addTabs(rules + finalValue, this.tabSize)}\n}`
    }

    const cssWrapper = this.generateCSSWrapper(prefix, rules, finalValue)
    return rulesOnly ? cssWrapper : `${selector} {\n${this.addTabs(cssWrapper, this.tabSize)}\n}`
  }

  public addStyle(layer: string = 'base', config: ApplyStyleObject = {}): this {
    if (!this.layers.has(layer)) {
      this.addLayer(layer)
    }

    const ui = this.processApplyObject(config)
    const currentStyles = this.layers.get(layer) || ''

    this.layers.set(layer, currentStyles + ui)

    return this
  }

  public createStyles(finalUtilities: string = ''): string {
    if (this.useResetter) {
      this.addStyle('preflight', { ...variables, ...resetter })
    }

    const existingLayers = Array.from(this.layers.keys())
    const orderedLayers = this.layerOrder.filter((layer) => existingLayers.includes(layer))

    let styles = this.useLayer ? `@layer ${orderedLayers.join(', ')};\n` : ''

    orderedLayers.forEach((layer) => {
      if (
        (this as any)[`${layer}Config`] &&
        Object.entries((this as any)[`${layer}Config`]).length > 0
      )
        this.addStyle(layer, (this as any)[`${layer}Config`])

      let layerStyles = this.layers.get(layer) || ''

      if (layer === 'utilities' && finalUtilities.trim()) {
        layerStyles +=
          layerStyles !== '' ? '\n' : '' + this.processApplyObject(this.apply) + `${finalUtilities}`
      }

      if (layerStyles.trim()) {
        styles += this.useLayer
          ? `@layer ${layer} {\n${this.addTabs(layerStyles)}\n}\n`
          : layerStyles
      }
    })

    return styles
  }

  public render(classNames?: string | string[]): string {
    if (!classNames) return this.createStyles()

    const classes = Array.isArray(classNames) ? classNames : classNames.split(/\s+/).filter(Boolean)

    let utilityStyles = ''
    let aliasStyles = ''

    classes.forEach((className) => {
      if (this.aliases[className]) {
        aliasStyles += `.${className} {\n${this.addTabs(
          this.generateRulesFromClass(this.aliases[className])
        )}\n}\n`
      } else {
        const processedStyles = this.main
          .process(className)
          .map((item) => this.generate(item))
          .join('\n')

        if (processedStyles) {
          utilityStyles += processedStyles + '\n'
        }
      }
    })

    return this.createStyles(aliasStyles + utilityStyles)
  }
}

export { is, merge, transformClasses } from '@nousantx/someutils'
export * from '@tenoxui/moxie'
export * from './types'
export { preflight } from './style/preflight'
import { properties } from './lib/property'
import { values } from './lib/value'
import { classes } from './lib/classes'
export { defaultColors as colors } from './lib/color'
export default AnyCSS
