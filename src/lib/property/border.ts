import type { GetCSSProperty } from '@tenoxui/types'
import type { Property, PropertyValue, PropertyParams } from '@tenoxui/moxie'
import { is } from '@nousantx/someutils'
import { createColor } from '@/utils/createColorValue'

export const borderProperty = (sizing: number): Property => {
  const createWidthValue = (value: string, unit?: string) =>
    !value ? '1px' : is.number.test(value + unit) ? value + 'px' : value + unit

  const radiusValue = ({ value = '', unit = '' }) => {
    if (!value) return '1px'
    if (is.length.test(value)) return value
    if (is.number.test(value + unit)) return sizing * Number(value) + 'rem'
    return value + unit
  }

  const createBorderPropertyFunction = (baseName: string) => {
    return ({
      value = '',
      unit = '',
      key = '',
      secondValue = '',
      secondUnit = ''
    }: PropertyParams) => {
      if (
        key === 'color' ||
        is.color.test(value || '') ||
        ['inherit', 'current', 'black', 'white', 'transparent'].includes(value || '')
      ) {
        return `value:${baseName}-color: ${createColor(
          value || '',
          secondValue,
          secondUnit
        )}` as GetCSSProperty
      }
      if (
        key === 'style' ||
        ['solid', 'dashed', 'double', 'hidden', 'none', 'dotted'].includes(value || '')
      ) {
        return `value:${baseName}-style: ${value}` as GetCSSProperty
      }
      const suffix = baseName === 'border' ? (key ? `-${key}-width` : '-width') : '-width'
      return `value:${baseName}${suffix}: ${createWidthValue(value || '', unit)}` as GetCSSProperty
    }
  }

  const createRadiusUtility = (propNames: GetCSSProperty | GetCSSProperty[]) => ({
    property: propNames,
    group: 'anc-border-radius-value',
    value: radiusValue
  })

  const borderRadiusUtilities = {
    radius: createRadiusUtility('borderRadius'),
    'radius-t': createRadiusUtility(['borderTopLeftRadius', 'borderTopRightRadius']),
    'radius-b': createRadiusUtility(['borderBottomLeftRadius', 'borderBottomRightRadius']),
    'radius-l': createRadiusUtility(['borderTopLeftRadius', 'borderBottomLeftRadius']),
    'radius-r': createRadiusUtility(['borderTopRightRadius', 'borderBottomRightRadius']),
    'radius-tl': createRadiusUtility('borderTopLeftRadius'),
    'radius-tr': createRadiusUtility('borderTopRightRadius'),
    'radius-bl': createRadiusUtility('borderBottomLeftRadius'),
    'radius-br': createRadiusUtility('borderBottomRightRadius')
  }

  const borderDirections: Record<string, string> = {
    border: 'border',
    'border-x': 'border-inline',
    'border-y': 'border-block',
    'border-t': 'border-top',
    'border-r': 'border-right',
    'border-b': 'border-bottom',
    'border-l': 'border-left'
  }

  const borderProperties = Object.entries(borderDirections).reduce<Record<string, PropertyValue>>(
    (acc, [key, baseName]) => {
      acc[key] = {
        property: createBorderPropertyFunction(baseName),
        value: key === 'border' ? undefined : null
      }
      return acc
    },
    {}
  )

  return {
    ...borderProperties,
    ...borderRadiusUtilities,
    outline: {
      property: createBorderPropertyFunction('outline'),
      value: null
    }
  } as Property
}
