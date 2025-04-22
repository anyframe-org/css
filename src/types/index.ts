import type { Property, Config as MoxieOptions } from '@tenoxui/moxie'
import type { Values, Classes, Aliases, CSSPropertyOrVariable } from '@tenoxui/types'
import { TenoxUI as Moxie } from '@tenoxui/moxie'

export type Variants = {
  [name: string]: string
}
export type Breakpoints = {
  [bpName: string]: string
}
export type Keys = {
  [name: string]: string
}
export type ColorFormat = 'hsl' | 'rgb' | 'hwb' | 'lab' | 'lch' | 'oklch'
export type ApplyStyleObject = {
  SINGLE_RULE?: string[]
} & {
  [key in Exclude<string, 'SINGLE_RULE'>]?: string | ApplyStyleObject
}

type UtilityStyle = {
  [className: string]: {
    [property in CSSPropertyOrVariable]?: string
  }
}

export interface TenoxUIConfig {
  property?: Property
  values?: Values
  classes?: Classes
}

export interface Config {
  shorthand: Property
  valueAlias: Values
  utilityClass: Classes
  utilityStyle: UtilityStyle
  sizing: number
  classNamePrefix: string
  colorVariant: ColorFormat
  colors: { [name: string]: string }
  tabSize: number
  showLayerDirective: boolean
  preflight: boolean
  layerOrder: string[]
  variants: Variants
  customVariants: Property
  breakpoints: Breakpoints
  alias: Aliases
  apply: ApplyStyleObject
  base: ApplyStyleObject
  theme: ApplyStyleObject
  components: ApplyStyleObject
  safelist: string[]
  moxie: typeof Moxie
  moxieOptions: MoxieOptions
}
