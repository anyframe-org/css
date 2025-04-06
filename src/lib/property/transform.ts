import type { Property } from '@tenoxui/moxie'
import type { GetCSSProperty } from '@tenoxui/types'
import { is } from '@nousantx/someutils'

export const transformProperty = (sizing: number): Property => ({
  origin: 'transformOrigin',
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
  'move-x': ({ value = '', unit = '' }) => {
    let finalValue
    if (is.number.test(value + unit)) {
      finalValue = sizing * Number(value) + 'rem'
    } else finalValue = value + unit

    return `value:--anc-move-x: ${finalValue}; translate: var(--anc-move-x, 0) var(--anc-move-y, 0)` as GetCSSProperty
  },
  'move-y': ({ value = '', unit = '' }) => {
    let finalValue
    if (is.number.test(value + unit)) {
      finalValue = sizing * Number(value) + 'rem'
    } else finalValue = value + unit

    return `value:--anc-move-y: ${finalValue}; translate: var(--anc-move-x, 0) var(--anc-move-y, 0)` as GetCSSProperty
  },
  scale: ({ value = '', unit = '', secondValue = '', secondUnit = '' }) => {
    const firstVal = value + unit
    const secondVal = secondValue ? secondValue + secondUnit : firstVal

    return `value:scale: ${firstVal} ${secondVal}` as GetCSSProperty
  },
  skew: ({ value = '', unit = '', secondValue = '', secondUnit = '' }) => {
    const firstVal = value + (unit || 'deg')
    const secondVal = secondValue ? secondValue + secondUnit : firstVal

    return `value:transform: skewX(${firstVal}) skewY(${secondVal})` as GetCSSProperty
  }
})
