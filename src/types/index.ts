import type { Property } from '@tenoxui/moxie'
import type { Values, Classes, Aliases } from '@tenoxui/types'
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

export interface TenoxUIConfig {
  property?: Property
  values?: Values
  classes?: Classes
  aliases?: Aliases
}

export interface Config extends TenoxUIConfig {
  sizing: number
  colorVariant: ColorFormat
  colors: { [name: string]: string }
  tabSize: number
  showLayerModifier: boolean
  variants: Variants
  customVariants: Property
  breakpoints: Breakpoints
  moxie: typeof Moxie
}
