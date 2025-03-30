import type { Property } from '@tenoxui/moxie'
import { is } from '@nousantx/someutils'

export const filterProperty = (sizing: number): Property => ({
  blur: {
    property: 'filter',
    group: 'anc-blur-value',
    value: ({ value, unit = '' }) => {
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
  brightness: ({ value }) => `value:filter: brightness(${value}%)`,
  contrast: ({ value }) => `value:filter: contrast(${value}%)`,
  saturate: ({ value }) => `value:filter: saturate(${value}%)`,
  sepia: ({ value }) => `value:filter: sepia(${!value ? '100' : value}%)`,
  grayscale: ({ value }) => `value:filter: grayscale(${!value ? '100' : value}%)`,
  invert: ({ value }) => `value:filter: invert(${!value ? '100' : value}%)`,
  'hue-rotate': ({ value, unit }) => {
    let finalValue

    if (is.angle.test(value + unit)) finalValue = value + unit
    else finalValue = value + 'deg'

    return `value:filter: hue-rotate(${finalValue})`
  },

  'backdrop-blur': {
    property: 'backdrop-filter',
    group: 'anc-blur-value',
    value: ({ value, unit = '' }) => {
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
  'backdrop-brightness': ({ value }) => `value:backdrop-filter: brightness(${value}%)`,
  'backdrop-contrast': ({ value }) => `value:backdrop-filter: contrast(${value}%)`,
  'backdrop-saturate': ({ value }) => `value:backdrop-filter: saturate(${value}%)`,
  'backdrop-sepia': ({ value }) => `value:backdrop-filter: sepia(${!value ? '100' : value}%)`,
  'backdrop-grayscale': ({ value }) =>
    `value:backdrop-filter: grayscale(${!value ? '100' : value}%)`,
  'backdrop-invert': ({ value }) => `value:backdrop-filter: invert(${!value ? '100' : value}%)`,
  'backdrop-hue-rotate': ({ value, unit }) => {
    let finalValue
    if (is.angle.test(value + unit)) finalValue = value + unit
    else finalValue = value + 'deg'
    return `value:backdrop-filter: hue-rotate(${finalValue})`
  }
})
