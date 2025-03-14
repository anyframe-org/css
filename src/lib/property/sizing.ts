import type { Keys } from '@/types'
import type { GetCSSProperty } from '@tenoxui/types'
import type { ValuePropType, PropertyValue, Property } from '@tenoxui/moxie'
import { is } from '@nousantx/someutils'

const sizingPropertyMap: Record<string, GetCSSProperty> = {
  size: ['width', 'height'],
  'w-min': 'minWidth',
  'w-max': 'maxWidth',
  'h-min': 'minHeight',
  'h-max': 'maxHeight',
  top: 'top',
  right: 'right',
  bottom: 'bottom',
  left: 'left',
  inset: 'inset',
  gap: 'gap',
  'gap-x': 'columnGap',
  'gap-y': 'rowGap',
  mt: 'marginTop',
  mr: 'marginRight',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mx: 'marginInline',
  my: 'marginBlock',
  pt: 'paddingTop',
  pr: 'paddingRight',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  py: 'paddingBlock',
  px: 'paddingInline'
}

export const sizingProperty = (sizing: number): Property => {
  const value: ValuePropType = ({ value = '', unit = '' }) => {
    if (is.number.test(value + unit)) return sizing * Number(value) + 'rem'
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

  properties.w = {
    value,
    group: 'container-size',
    property: ({ key = '' }) => {
      const keys: Keys = { min: 'minWidth', max: 'maxWidth' }
      return keys[key as string] || 'width'
    }
  } as PropertyValue

  properties.h = {
    value,
    group: 'container-size',
    property: ({ key = '' }) => {
      const keys: Keys = { min: 'minHeight', max: 'maxHeight' }
      return keys[key as string] || 'height'
    }
  } as PropertyValue

  return properties
}
