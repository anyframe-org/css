import type { GetCSSProperty } from '@tenoxui/types'
import type {  Property } from '@tenoxui/moxie'
import { is } from '@nousantx/someutils'
import { createColor } from '@/utils/createColorValue'

export const borderProperty = (sizing: number): Property => ({
  radius: {
    // group: 'radius',
    property: ({ key = '' }) => {
      const keys: Record<string, GetCSSProperty> = {
        t: ['borderTopLeftRadius', 'borderTopRightRadius'],
        r: ['borderTopRightRadius', 'borderBottomRightRadius'],
        b: ['borderBottomRightRadius', 'borderBottomLeftRadius'],
        l: ['borderTopLeftRadius', 'borderBottomLeftRadius'],

        tl: 'borderTopLeftRadius',
        tr: 'borderTopRightRadius',
        br: 'borderBottomRightRadius',
        bl: 'borderBottomLeftRadius'
      }

      return (keys[key as string] || 'borderRadius') as GetCSSProperty
    },
    value: ({ value = '', unit = '' }) => {
      const values: Record<string, string> = {
        xs: '0.125rem',
        sm: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem'
      }

      return values[value] || value + unit
    }
  },
  border: {
    property: ({ value = '', unit = '', key = '', secondValue = '', secondUnit = '' }) => {
      const keys: Record<string, string> = {
        x: 'border-inline-width',
        y: 'border-block-eidth',
        t: 'border-top-width',
        r: 'border-right-width',
        b: 'border-bottom-width',
        l: 'border-left-width'
      }

      if (
        key === 'color' ||
        is.color.test(value) ||
        ['inherit', 'current', 'black', 'white', 'transparent'].includes(value)
      ) {
        return ('border-color: ' + createColor(value, secondValue, secondUnit)) as GetCSSProperty
      } else if (
        key === 'style' ||
        ['solid', 'dashed', 'double', 'hidden', 'none', 'dotted'].includes(value)
      )
        return ('border-style: ' + value) as GetCSSProperty

      let finalValue = !value ? '1px' : is.number.test(value + unit) ? value + 'px' : value + unit

      return ('border-style: ' +
        (secondValue || 'solid') +
        '; ' +
        (keys[key as string] || 'border-width') +
        ': ' +
        finalValue) as GetCSSProperty
    },
    value: null
  },
  outline: {
    property: ({ value = '', unit = '', key = '', secondValue = '', secondUnit = '' }) => {
      if (
        key === 'color' ||
        is.color.test(value) ||
        ['inherit', 'current', 'black', 'white', 'transparent'].includes(value)
      ) {
        return ('outline-color: ' + createColor(value, secondValue, secondUnit)) as GetCSSProperty
      } else if (key === 'style' || ['solid', 'dashed', 'double', 'none', 'dotted'].includes(value))
        return ('outline-style: ' + value) as GetCSSProperty

      let finalValue = !value ? '1px' : is.number.test(value + unit) ? value + 'px' : value + unit

      return ('outline-style: ' +
        (secondValue || 'solid') +
        '; ' +
        'outline-width' +
        ': ' +
        finalValue) as GetCSSProperty
    },
    value: null
  }
})
