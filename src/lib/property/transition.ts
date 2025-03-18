import type { Property } from '@tenoxui/moxie'
import type { GetCSSProperty } from '@tenoxui/types'
import { is } from '@nousantx/someutils'

export const transitionProperty: Property = {
  transition: {
    value: null,
    property: ({ key = '', value = '', unit = '' }) => {
      if (
        !value ||
        key === 'property' ||
        ['all', 'colors', 'opacity', 'shadow', 'transform'].includes(value)
      ) {
        let finalValue
        if (!value)
          finalValue =
            'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, translate, scale, rotate, filter, -webkit-backdrop-filter, backdrop-filter'
        else if (value === 'colors')
          finalValue = 'color, background-color, border-color, text-decoration-color, fill, stroke'
        else if (value === 'shadow') finalValue = 'box-shadow'
        else if (value === 'transform') finalValue = 'transform, translate, scale, rotate'
        else finalValue = value

        return `value:transition-property: ${finalValue}; transition-duration: 150ms; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)` as GetCSSProperty
      } else if (key === 'behavior' || ['normal', 'discrete'].includes(value)) {
        return `value:transition-behavior: ${
          value === 'discrete' ? 'allow-discrete' : value
        }` as GetCSSProperty
      } else if (key === 'duration' || value === 'initial' || is.number.test(value)) {
        return `value:transition-duration: ${
          value === 'initial' ? 'initial' : value + (unit || 'ms')
        }` as GetCSSProperty
      } else if (key === 'delay')
        return ('value:transition-delay: ' +
          (is.time.test(value) ? value : value + (unit || 'ms'))) as GetCSSProperty

      return ('value:transition: ' + value + unit) as GetCSSProperty
    }
  },
  ease: {
    property: 'transitionTimingFunction',
    value: ({ value = '' }) => {
      const values: Record<string, string> = {
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)'
      }

      return values[value as string] || value || 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  },
  duration: {
    property: 'transitionDuration',
    value: ({ value = '', unit = '' }) => {
      return value + (unit || 'ms')
    }
  },
  delay: {
    property: 'transitionDelay',
    value: ({ value = '', unit = '' }) => {
      return value + (unit || 'ms')
    }
  }
}
