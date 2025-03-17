import type { Property, Config as MoxieOptions } from '@tenoxui/moxie'
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
export type ApplyStyleObject = {
  SINGLE_RULE?: string[]
} & {
  [key in Exclude<string, 'SINGLE_RULE'>]?: string | ApplyStyleObject
}

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
  showLayerDirective: boolean
  preflight: boolean
  layerOrder: string[]
  variants: Variants
  customVariants: Property
  breakpoints: Breakpoints
  base: ApplyStyleObject
  theme: ApplyStyleObject
  components: ApplyStyleObject
  moxie: typeof Moxie
  moxieOptions: MoxieOptions
}
