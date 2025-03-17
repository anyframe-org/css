import type { Property } from '@tenoxui/moxie'
import { is } from '@nousantx/someutils'

export const transformProperty = (sizing: number): Property => ({
  move: {
    property: 'translate',
    value: ({ value = '', unit = '', secondValue = '', secondUnit = '' }) => {
      if (!value) return ''

      const isNumber = is.number.test(value + unit)
      const firstVal = isNumber ? `${sizing * Number(value)}rem` : value + unit
      const secondVal =
        secondValue && is.number.test(secondValue + secondUnit)
          ? `${sizing * Number(secondValue)}rem`
          : secondValue
            ? secondValue + secondUnit
            : firstVal

      return `${firstVal} ${secondVal}`
    }
  },
  'move-x': {
    property: 'translate',
    value: ({ value = '', unit = '' }) => {
      if (is.number.test(value + unit)) {
        return sizing * Number(value) + 'rem'
      }

      return `${value + unit} var(--tui-move-y)`
    }
  },
  'move-y': {
    property: 'translate',
    value: ({ value = '', unit = '' }) => {
      if (is.number.test(value + unit)) {
        return sizing * Number(value) + 'rem'
      }

      return `var(--tui-move-y) ${value + unit}`
    }
  }
})
