import type { GetCSSProperty } from '@tenoxui/types'

export type PropertyParams = {
  key?: string | null
  value?: string
  unit?: string
  secondValue?: string
  secondUnit?: string
}

export type ValueParams = {
  key?: string | null
  value?: string
  unit?: string
  secondValue?: string
  secondUnit?: string
  property?: GetCSSProperty
}

export type PropertyParamValue = GetCSSProperty | ((params: PropertyParams) => GetCSSProperty)

export type ValuePropType = string | ((params: ValueParams) => string | null) | null

export type PropertyValue =
  | PropertyParamValue
  | {
      property?: PropertyValue
      value?: ValuePropType
      group?: string
    }

export type Property = {
  [type: string]: PropertyValue
}
