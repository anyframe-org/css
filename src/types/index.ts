import type {Property} from "@tenoxui/moxie"
import type {Values,Classes,Aliases} from "@tenoxui/types"

export type Variants = {
  [name: string]: string
}
export type Breakpoints = {
  [bpName: string]: string
}
export type Keys = {
  [name: string]: string
}
export interface TenoxUIConfig {
  property?: Property
  values?: Values
  classes?: Classes
  aliases?: Aliases
}