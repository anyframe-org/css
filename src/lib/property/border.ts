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
      const borderStyleValue: string[] = ['solid', 'dashed', 'double', 'hidden', 'none', 'dotted']

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
      if (key === 'style' || borderStyleValue.includes(value || '')) {
        return `value:${baseName}-style: ${value}${secondValue}` as GetCSSProperty
      }
      const suffix = baseName === 'border' ? (key ? `-${key}-width` : '-width') : '-width'
      return `value:${baseName}${suffix}: ${createWidthValue(value || '', unit)}${
        borderStyleValue.includes(secondValue) ? `; ${baseName}-style: ` + secondValue : ''
      }` as GetCSSProperty
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
    },
    'divide-x': ({ value = '', unit = '' }) => {
      const template = 'value:& > :not(:last-child) {'

      let finalValue

      if (!value) finalValue = '1px'
      else if (is.number.test(value + unit)) finalValue = Number(value) + 'px'
      else if (is.length.test(value)) finalValue = value
      else finalValue = value + unit

      return (template +
        `
  border-inline-start-width: 0px;
  border-inline-end-width: ${finalValue};
}`) as GetCSSProperty
    },

    'divide-y': ({ value = '', unit = '' }) => {
      const template = 'value:& > :not(:last-child) {'

      let finalValue

      if (!value) finalValue = '1px'
      else if (is.number.test(value + unit)) finalValue = Number(value) + 'px'
      else if (is.length.test(value)) finalValue = value
      else finalValue = value + unit

      return (template +
        `
  border-block-start-width: 0px;
  border-block-end-width: ${finalValue};
}`) as GetCSSProperty
    },

    divide: ({ key = '', value = '', secondValue = '' }) => {
      const template = 'value:& > :not(:last-child) { border-'

      let finalValue

      if (
        key === 'color' ||
        is.color.test(value || '') ||
        ['inherit', 'current', 'black', 'white', 'transparent'].includes(value || '')
      ) {
        finalValue = createColor(value, secondValue)
      } else finalValue = value

      if (key === 'color') {
        return template + 'color: ' + finalValue + ' }'
      } else return template + 'style: ' + finalValue + ' }'
    }
  } as Property
}
