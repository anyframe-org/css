import type { GetCSSProperty } from '@tenoxui/types'
import type { Property } from '@tenoxui/moxie'
import { is } from '@nousantx/someutils'
import { createColor } from '@/utils/createColorValue'

export const borderProperty = (sizing: number): Property => {
  const createWidthValue = (value: string, unit?: string) =>
    !value ? '1px' : is.number.test(value + unit) ? value + 'px' : value + unit

  return {
    border: {
      property: ({ value = '', unit = '', key = '', secondValue = '', secondUnit = '' }) => {
        const keys: Record<string, string> = {
          x: 'border-inline-width',
          y: 'border-block-width',
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
          return ('value:border-color: ' +
            createColor(value, secondValue, secondUnit)) as GetCSSProperty
        } else if (
          key === 'style' ||
          ['solid', 'dashed', 'double', 'hidden', 'none', 'dotted'].includes(value)
        )
          return ('value:border-style: ' + value) as GetCSSProperty

        return ('value:' +
          (keys[key as string] || 'border-width') +
          ': ' +
          createWidthValue(value, unit)) as GetCSSProperty
      }
    },
    'border-x': {
      property: ({ value = '', unit = '', key = '', secondValue = '', secondUnit = '' }) => {
        const base = 'border-inline'

        if (
          key === 'color' ||
          is.color.test(value) ||
          ['inherit', 'current', 'black', 'white', 'transparent'].includes(value)
        ) {
          return (`value:${base}-color: ` +
            createColor(value, secondValue, secondUnit)) as GetCSSProperty
        } else if (
          key === 'style' ||
          ['solid', 'dashed', 'double', 'hidden', 'none', 'dotted'].includes(value)
        )
          return (`value:${base}-style: ` + value) as GetCSSProperty

        return (`value:${base}-width: ` + createWidthValue(value, unit)) as GetCSSProperty
      },
      value: null
    },
    'border-y': {
      property: ({ value = '', unit = '', key = '', secondValue = '', secondUnit = '' }) => {
        const base = 'border-block'

        if (
          key === 'color' ||
          is.color.test(value) ||
          ['inherit', 'current', 'black', 'white', 'transparent'].includes(value)
        ) {
          return (`value:${base}-color: ` +
            createColor(value, secondValue, secondUnit)) as GetCSSProperty
        } else if (
          key === 'style' ||
          ['solid', 'dashed', 'double', 'hidden', 'none', 'dotted'].includes(value)
        )
          return (`value:${base}-style: ` + value) as GetCSSProperty

        return (`value:${base}-width: ` + createWidthValue(value, unit)) as GetCSSProperty
      },
      value: null
    },
    'border-t': {
      property: ({ value = '', unit = '', key = '', secondValue = '', secondUnit = '' }) => {
        const base = 'border-top'

        if (
          key === 'color' ||
          is.color.test(value) ||
          ['inherit', 'current', 'black', 'white', 'transparent'].includes(value)
        ) {
          return (`value:${base}-color: ` +
            createColor(value, secondValue, secondUnit)) as GetCSSProperty
        } else if (
          key === 'style' ||
          ['solid', 'dashed', 'double', 'hidden', 'none', 'dotted'].includes(value)
        )
          return (`value:${base}-style: ` + value) as GetCSSProperty

        return (`value:${base}-width: ` + createWidthValue(value, unit)) as GetCSSProperty
      },
      value: null
    },
    'border-r': {
      property: ({ value = '', unit = '', key = '', secondValue = '', secondUnit = '' }) => {
        const base = 'border-right'

        if (
          key === 'color' ||
          is.color.test(value) ||
          ['inherit', 'current', 'black', 'white', 'transparent'].includes(value)
        ) {
          return (`value:${base}-color: ` +
            createColor(value, secondValue, secondUnit)) as GetCSSProperty
        } else if (
          key === 'style' ||
          ['solid', 'dashed', 'double', 'hidden', 'none', 'dotted'].includes(value)
        )
          return (`value:${base}-style: ` + value) as GetCSSProperty

        return (`value:${base}-width: ` + createWidthValue(value, unit)) as GetCSSProperty
      },
      value: null
    },
    'border-b': {
      property: ({ value = '', unit = '', key = '', secondValue = '', secondUnit = '' }) => {
        const base = 'border-bottom'

        if (
          key === 'color' ||
          is.color.test(value) ||
          ['inherit', 'current', 'black', 'white', 'transparent'].includes(value)
        ) {
          return (`value:${base}-color: ` +
            createColor(value, secondValue, secondUnit)) as GetCSSProperty
        } else if (
          key === 'style' ||
          ['solid', 'dashed', 'double', 'hidden', 'none', 'dotted'].includes(value)
        )
          return (`value:${base}-style: ` + value) as GetCSSProperty

        return (`value:${base}-width: ` + createWidthValue(value, unit)) as GetCSSProperty
      },
      value: null
    },
    'border-l': {
      property: ({ value = '', unit = '', key = '', secondValue = '', secondUnit = '' }) => {
        const base = 'border-left'

        if (
          key === 'color' ||
          is.color.test(value) ||
          ['inherit', 'current', 'black', 'white', 'transparent'].includes(value)
        ) {
          return (`value:${base}-color: ` +
            createColor(value, secondValue, secondUnit)) as GetCSSProperty
        } else if (
          key === 'style' ||
          ['solid', 'dashed', 'double', 'hidden', 'none', 'dotted'].includes(value)
        )
          return (`value:${base}-style: ` + value) as GetCSSProperty

        return (`value:${base}-width: ` + createWidthValue(value, unit)) as GetCSSProperty
      },
      value: null
    },

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

    outline: {
      property: ({ value = '', unit = '', key = '', secondValue = '', secondUnit = '' }) => {
        if (
          key === 'color' ||
          is.color.test(value) ||
          ['inherit', 'current', 'black', 'white', 'transparent'].includes(value)
        ) {
          return ('value:outline-color: ' +
            createColor(value, secondValue, secondUnit)) as GetCSSProperty
        } else if (
          key === 'style' ||
          ['solid', 'dashed', 'double', 'none', 'dotted'].includes(value)
        )
          return ('value:outline-style: ' + value) as GetCSSProperty

        return ('value:outline-width: ' + createWidthValue(value, unit)) as GetCSSProperty
      },
      value: null
    }
  }
}
