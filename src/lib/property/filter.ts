import { is } from '@nousantx/someutils'
import type { Property } from '@tenoxui/moxie'
import type { GetCSSProperty } from '@tenoxui/types'

export const filterProperty = (sizing: number): Property => ({
  blur: {
    property: 'filter',
    group: 'anc-blur-value',
    value: ({ value = '', unit = '', secondValue = '' }) => {
      if (secondValue) return null
      if (!value) return 'blur(10px)'
      const inputValue = value + unit
      return `blur(${
        is.length.test(value)
          ? value
          : is.length.test(inputValue)
            ? inputValue
            : is.number.test(inputValue)
              ? `${sizing * Number(value)}rem`
              : inputValue
      })`
    }
  },
  brightness: ({ value, secondValue }) =>
    secondValue ? null : (`value:filter: brightness(${value}%)` as GetCSSProperty),
  contrast: ({ value, secondValue }) =>
    !value || secondValue ? null : (`value:filter: contrast(${value}%)` as GetCSSProperty),
  saturate: ({ value, secondValue }) =>
    !value || secondValue ? null : (`value:filter: saturate(${value}%)` as GetCSSProperty),
  sepia: ({ value, secondValue }) =>
    secondValue ? null : (`value:filter: sepia(${!value ? '100' : value}%)` as GetCSSProperty),
  grayscale: ({ value, secondValue }) =>
    secondValue ? null : (`value:filter: grayscale(${!value ? '100' : value}%)` as GetCSSProperty),
  invert: ({ value, secondValue }) =>
    secondValue ? null : (`value:filter: inverlt(${!value ? '100' : value}%)` as GetCSSProperty),
  'hue-rotate': ({ value = '', unit = '', secondValue }) => {
    if (!value || secondValue) return null
    let finalValue

    if (is.angle.test(value + unit)) finalValue = value + unit
    else finalValue = value + 'deg'

    return `value:filter: hue-rotate(${finalValue})` as GetCSSProperty
  },

  'backdrop-blur': {
    property: 'backdropFilter',
    group: 'anc-blur-value',
    value: ({ value = '', unit = '', secondValue }) => {
      if (secondValue) return null
      if (!value) return 'blur(10px)'
      const inputValue = value + unit
      return `blur(${
        is.length.test(value)
          ? value
          : is.length.test(inputValue)
            ? inputValue
            : is.number.test(inputValue)
              ? `${sizing * Number(value)}rem`
              : inputValue
      })`
    }
  },
  'backdrop-brightness': ({ value, secondValue }) =>
    !value || secondValue
      ? null
      : (`value:backdrop-filter: brightness(${value}%)` as GetCSSProperty),
  'backdrop-contrast': ({ value, secondValue }) =>
    !value || secondValue ? null : (`value:backdrop-filter: contrast(${value}%)` as GetCSSProperty),
  'backdrop-saturate': ({ value, secondValue }) =>
    !value || secondValue ? null : (`value:backdrop-filter: saturate(${value}%)` as GetCSSProperty),
  'backdrop-sepia': ({ value, secondValue }) =>
    secondValue
      ? null
      : (`value:backdrop-filter: sepia(${!value ? '100' : value}%)` as GetCSSProperty),
  'backdrop-grayscale': ({ value, secondValue }) =>
    secondValue
      ? null
      : (`value:backdrop-filter: grayscale(${!value ? '100' : value}%)` as GetCSSProperty),
  'backdrop-invert': ({ value, secondValue }) =>
    secondValue
      ? null
      : (`value:backdrop-filter: invert(${!value ? '100' : value}%)` as GetCSSProperty),
  'backdrop-hue-rotate': ({ value = '', unit = '', secondValue }) => {
    if (!value || secondValue) return null
    let finalValue
    if (is.angle.test(value + unit)) finalValue = value + unit
    else finalValue = value + 'deg'
    return `value:backdrop-filter: hue-rotate(${finalValue})` as GetCSSProperty
  }
})
