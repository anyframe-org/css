import type { GetCSSProperty } from '@tenoxui/types'
import type { Property } from '@tenoxui/moxie'
import { is } from '@nousantx/someutils'
import { createColor } from '@/utils/createColorValue'

export const shadowProperty: Property = {
  shadow: {
    property: ({ key = '', value = '', secondValue = '', secondUnit = '' }) => {
      const shadowType = key === 'inset' ? 'inset-shadow' : 'shadow'

      const values: Record<string, string> = {
        '2xs': `0 1px var(--anc-${shadowType}-color, rgb(0 0 0 / 0.05))`,
        xs: `0 1px 2px 0 var(--anc-${shadowType}-color, rgb(0 0 0 / 0.05))`,
        sm: `0 1px 3px 0 var(--anc-${shadowType}-color, rgb(0 0 0 / 0.1)), 0 1px 2px -1px var(--anc-${shadowType}-color, rgb(0 0 0 / 0.1))`,
        md: `0 4px 6px -1px var(--anc-${shadowType}-color, rgb(0 0 0 / 0.1)), 0 2px 4px -2px var(--anc-${shadowType}-color, rgb(0 0 0 / 0.1))`,
        lg: `0 10px 15px -3px var(--anc-${shadowType}-color, rgb(0 0 0 / 0.1)), 0 4px 6px -4px var(--anc-${shadowType}-color, rgb(0 0 0 / 0.1))`,
        xl: `0 20px 25px -5px var(--anc-${shadowType}-color, rgb(0 0 0 / 0.1)), 0 8px 10px -6px var(--anc-${shadowType}-color, rgb(0 0 0 / 0.1))`,
        '2xl': `0 25px 50px -12px var(--anc-${shadowType}-color, rgb(0 0 0 / 0.25))`,
        none: '0 0 #0000'
      }
      const insetValues: Record<string, string> = {
        '2xs': 'inset 0 1px var(--anc-inset-shadow-color, rgb(0 0 0 / 0.05)',
        xs: 'inset 0 1px 1px var(--anc-inset-shadow-color, rgb(0 0 0 / 0.05))',
        sm: 'inset 0 2px 4px var(--anc-inset-shadow-color, rgb(0 0 0 / 0.05))',
        none: '0 0 #0000'
      }

      if (is.color.test(value))
        return `--anc-${shadowType}-color: ${createColor(
          value,
          secondValue,
          secondUnit
        )}` as GetCSSProperty
      else
        return `--anc-${shadowType}: ${
          (key === 'inset' ? insetValues[value] : values[value]) || value
        }; box-shadow: var(--anc-inset-shadow), var(--anc-inset-ring-shadow), var(--anc-ring-offset-shadow), var(--anc-shadow), var(--anc-ring-shadow)` as GetCSSProperty
    },
    value: null
  },
  ring: {
    property: ({ key = '', value = '', unit = '', secondValue = '', secondUnit = '' }) => {
      const shadowType = key === 'inset' ? 'inset-ring-shadow' : 'ring-shadow'
      let finalValue

      if (!value) finalValue = '1px'
      else if (is.color.test(value)) {
        finalValue = createColor(value, secondValue, secondUnit)
      } else if (is.number.test(value + unit)) finalValue = value + 'px'
      else finalValue = value + unit

      if (is.color.test(value) || value === 'current')
        return `--anc-${shadowType}-color: ${
          value === 'current' ? 'currentColor' : finalValue
        }` as GetCSSProperty
      else
        return `--anc-${shadowType}: ${
          key === 'inset' ? 'inset' : ''
        } 0 0 0 calc(${finalValue} + var(--anc-ring-offset-width, 2px)) var(--anc-ring-shadow-color, currentColor); box-shadow: var(--anc-inset-shadow), var(--anc-inset-ring-shadow), var(--anc-ring-offset-shadow), var(--anc-shadow), var(--anc-ring-shadow)` as GetCSSProperty
    },
    value: null
  },
  'ring-offset': {
    property: ({ key = '', value = '', unit = '', secondValue = '', secondUnit = '' }) => {
      let finalValue

      if (!value) finalValue = '1px'
      else if (is.color.test(value)) {
        finalValue = createColor(value, secondValue, secondUnit)
      } else if (is.number.test(value + unit)) finalValue = value + 'px'
      else finalValue = value + unit

      if (is.color.test(value) || value === 'current')
        return `--anc-ring-offset-color: ${
          value === 'current' ? 'currentColor' : finalValue
        }` as GetCSSProperty
      else
        return `--anc-ring-offset-width: ${finalValue}; --anc-ring-offset-shadow: 0 0 0 var(--anc-ring-offset-width) var(--anc-ring-offset-color);` as GetCSSProperty
    },
    value: null
  }
}
