import type { Keys } from '@/types'
import type { GetCSSProperty } from '@tenoxui/types'
import type { ValuePropType, PropertyValue, Property } from '@tenoxui/moxie'
import { is } from '@nousantx/someutils'

const sizingPropertyMap: Record<string, GetCSSProperty> = {
  w: 'width',
  h: 'height',
  'min-w': 'minWidth',
  'max-w': 'maxWidth',
  'min-h': 'minHeight',
  'max-h': 'maxHeight',
  size: ['width', 'height'],
  top: 'top',
  right: 'right',
  bottom: 'bottom',
  left: 'left',
  inset: 'inset',
  gap: 'gap',
  'gap-x': 'columnGap',
  'gap-y': 'rowGap',
  m: 'margin',
  mt: 'marginTop',
  mr: 'marginRight',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mx: 'marginInline',
  my: 'marginBlock',
  p: 'padding',
  pt: 'paddingTop',
  pr: 'paddingRight',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  py: 'paddingBlock',
  px: 'paddingInline'
}

export const sizingProperty = (sizing: number): Property => {
  const value: ValuePropType = ({ value = '', unit = '' }) => {
    if (is.number.test(value + unit))
      return value + unit !== '0' ? sizing * Number(value) + 'rem' : '0'
    return is.length.test(value) ? value : value + unit
  }

  const create = (propertyName: GetCSSProperty): PropertyValue => ({
    value,
    group: 'container-size',
    property: propertyName
  })

  const properties: Property = {}

  Object.entries(sizingPropertyMap).forEach(([key, prop]) => {
    properties[key] = create(prop)
  })

  return properties
}
