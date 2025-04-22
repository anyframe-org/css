import type { Property } from '@tenoxui/moxie'
import type { GetCSSProperty } from '@tenoxui/types'
import { createColor } from '@/utils/createColorValue'

export const interactivityProperties: Property = {
  accent: ({ value = '', secondValue = '' }) => {
    return !value
      ? null
      : (`value:accent-color: ${createColor(value, secondValue)}` as GetCSSProperty)
  },
  caret: ({ value = '', secondValue = '' }) => {
    return !value
      ? null
      : (`value:caret-color: ${createColor(value, secondValue)}` as GetCSSProperty)
  },
  fill: ({ value = '', secondValue = '' }) => {
    return !value ? null : (`value:fill: ${createColor(value, secondValue)}` as GetCSSProperty)
  },
  scheme: ({ value = '', secondValue }) => {
    if (!value || secondValue) return null

    const values: Record<string, string> = {
      'light-dark': 'light dark',
      'only-dark': 'only dark',
      'only-light': 'only light'
    }

    return `value:color-scheme: ${values[value] || value}` as GetCSSProperty
  }
}
