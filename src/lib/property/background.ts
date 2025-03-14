import type { GetCSSProperty } from '@tenoxui/types'
import type { PropertyParams, Property, PropertyValue } from '@tenoxui/moxie'
import { is } from '@nousantx/someutils'
import { createColor } from '@/utils/createColorValue'

export const backgroundProperty: Property = {
  'bg-clip': {
    property: 'backgroundClip',
    value: ({ value }) => (value !== 'text' ? value + '-box' : value)
  },
  'bg-origin': {
    property: 'backgroundOrigin',
    value: ({ value }) => (value !== 'text' ? value + '-box' : value)
  },
  bg: {
    property: ({ key, value = '', unit = '' }: PropertyParams) => {
      const keys: Record<string, GetCSSProperty> = {
        attachment: 'backgroundAttachment',
        color: 'backgroundColor',
        image: 'backgroundImage',
        clip: 'backgroundClip',
        position: 'backgroundPosition',
        repeat: 'backgroundRepeat',
        size: 'backgroundSize',
        origin: 'backgroundOrigin'
      }

      if (
        is.color.test(value) ||
        ['inherit', 'current', 'black', 'white', 'transparent'].includes(value)
      ) {
        return keys.color
      } else if (['fixed', 'scroll', 'local'].includes(value)) {
        return keys.attachment
      } else if (['repeat', 'repeat-x', 'repeat-y', 'no-repeat'].includes(value)) {
        return keys.repeat
      } else if (['cover', 'contain', 'auto'].includes(value) || is.length.test(value + unit)) {
        return keys.size
      } else if (/\d+%|\d+px|top|bottom|left|right|center/.test(value)) {
        return keys.position
      }

      return key ? keys[key] : 'background'
    },
    value: ({ key, value = '', unit = '', secondValue = '', secondUnit = '' }) => {
      if (value) {
        if (
          key === 'color' ||
          is.color.test(value) ||
          ['inherit', 'current', 'black', 'white', 'transparent'].includes(value)
        ) {
          return createColor(value, secondValue, secondUnit) as GetCSSProperty
        } else if (
          key === 'size' ||
          is.length.test(value + unit) ||
          ['cover', 'contain', 'auto'].includes(value)
        ) {
          return value + unit
        } else {
          return value
        }
      }

      return null
    }
  } as PropertyValue
}
