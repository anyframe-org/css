import type { GetCSSProperty } from '@tenoxui/types'
import type { PropertyParams, Property } from '@tenoxui/moxie'
import { is } from '@nousantx/someutils'
import { createColor } from '@/utils/createColorValue'

export const typographyProperty = (sizing: number): Property => {
  const lineHeightAlias: Record<string, string> = {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2'
  }

  return {
    text: {
      property: ({
        key,
        value = '',
        unit = '',
        secondValue = '',
        secondUnit = ''
      }: PropertyParams) => {
        type SizesType = Record<string, string[]>

        const sizes: SizesType = {
          xs: ['0.75rem', 'calc(1 / 0.75)'],
          sm: ['0.875rem', 'calc(1.25 / 0.875)'],
          base: ['1rem', 'calc(1.5 / 1)'],
          lg: ['1.125rem', 'calc(1.75 / 1.125)'],
          xl: ['1.25rem', 'calc(1.75 / 1.25)'],
          '2xl': ['1.5rem', 'calc(2 / 1.5)'],
          '3xl': ['1.875rem', 'calc(2.25 / 1.875)'],
          '4xl': ['2.25rem', 'calc(2.5 / 2.25)'],
          '5xl': ['3rem', '1'],
          '6xl': ['3.75rem', '1'],
          '7xl': ['4.5rem', '1'],
          '8xl': ['6rem', '1'],
          '9xl': ['8rem', '1']
        }

        if (
          key === 'color' ||
          is.color.test(value) ||
          (['inherit', 'current', 'black', 'white', 'transparent'].includes(value) &&
            key !== 'size')
        ) {
          return `value:color: ${createColor(value, secondValue, secondUnit)}` as GetCSSProperty
        } else if (
          key === 'align' ||
          ['center', 'justify', 'left', 'right', 'start', 'end'].includes(value)
        ) {
          return secondUnit ? null : (`value:text-align: ${value}` as GetCSSProperty)
        } else if (key === 'wrap' || ['wrap', 'nowrap', 'balance', 'pretty'].includes(value)) {
          return secondUnit ? null : (`value:text-wrap: ${value}` as GetCSSProperty)
        } else if (key === 'overflow' || ['ellipsis', 'clip'].includes(value)) {
          return secondUnit ? null : (`value:text-overflow: ${value}` as GetCSSProperty)
        } else if (
          key === 'size' ||
          is.length.test(value + unit) ||
          is.number.test(value + unit) ||
          value + unit in sizes
        ) {
          if (value + unit in sizes) {
            const sizeKey = (value + unit) as keyof SizesType

            const [fontSize, lineHeight] = sizes[sizeKey]
            return `value:font-size: ${fontSize}; line-height: ${
              is.number.test(secondValue + secondUnit)
                ? sizing * Number(secondValue) + 'rem'
                : lineHeightAlias[secondValue] || secondValue + secondUnit || lineHeight
            }` as GetCSSProperty
          }
          return `value:font-size: ${
            is.number.test(value + unit) ? sizing * Number(value) + 'rem' : value + unit
          }${
            secondValue
              ? `; line-height:
              ${
                is.number.test(secondValue + secondUnit)
                  ? sizing * Number(secondValue) + 'rem'
                  : lineHeightAlias[secondValue] || secondValue + secondUnit
              }`
              : ''
          }` as GetCSSProperty
        }
        return ('value:color: ' + value) as GetCSSProperty
      },
      value: null
    },
    font: {
      value: null,
      property: ({ key, value, secondValue }) => {
        if (!value || secondValue) return null
        const weightAlias: Record<string, string> = {
          thin: '100',
          extralight: '200',
          light: '300',
          normal: '400',
          medium: '500',
          semibold: '600',
          bold: '700',
          extrabold: '800',
          black: '900'
        }

        if (
          key === 'weight' ||
          weightAlias[value] ||
          is.number.test(value) ||
          value.endsWith('00')
        ) {
          return `value:font-weight: ${weightAlias[value] || value}` as GetCSSProperty
        } else if (key === 'family') {
          return `value:font-family: ${value}` as GetCSSProperty
        }

        return `value:font-family: ${value}` as GetCSSProperty

        // return `font-weight: ${weightAlias[value] || value}` as GetCSSProperty
      }
    },
    tracking: {
      property: ({ secondValue }) => (secondValue ? null : 'letterSpacing'),
      value: ({ value = '', unit = '' }) => {
        const values: Record<string, string> = {
          tighter: '-0.05em',
          tight: '-0.025em',
          normal: '0em',
          wide: '0.025em',
          wider: '0.05em',
          widest: '0.1em'
        }

        return values[value] || value + unit
      }
    },
    leading: {
      property: ({ secondValue }) => (secondValue ? null : 'lineHeight'),
      value: ({ value = '', unit = '' }) => {
        if (value === '0') return value
        else if (lineHeightAlias[value]) {
          return lineHeightAlias[value]
        } else if (!unit && is.number.test(value)) {
          return sizing * Number(value) + 'rem'
        } else {
          return value + unit
        }
      }
    },
    decoration: {
      property: ({ key, value = '', unit = '', secondValue = '', secondUnit = '' }) => {
        if (!value) return null

        if (key === 'color' || is.color.test(value)) {
          return ('value:text-decoration-color: ' +
            `${value.slice(0, -1)}${
              secondValue ? ' / ' + secondValue + (secondUnit || '%)') : ')'
            }`) as GetCSSProperty
        } else if (
          key === 'style' ||
          ['solid', 'dashed', 'double', 'dotted', 'wavy'].includes(value)
        ) {
          return `value:text-decoration-style: ${value}` as GetCSSProperty
        } else if (
          key === 'length' ||
          ['auto', 'from-font'].includes(value) ||
          is.number.test(value + unit) ||
          is.length.test(value + unit)
        ) {
          return `value:text-decoration-thickness: ${
            is.number.test(value + unit) ? value + 'px' : value + unit
          }` as GetCSSProperty
        }

        return ('value:text-decoration-color: ' + value) as GetCSSProperty
      },
      value: null
    },
    'underline-offset': {
      property: ({ unit }) => (unit ? null : 'textUnderlineOffset'),
      value: '{0}px'
    },
    indent: {
      property: ({ value, secondValue }) => (!value || secondValue ? null : 'textIndent'),
      value: ({ value = '', unit = '' }) => {
        if (value) {
          if (value === '0') return value
          else if (is.number.test(value + unit)) return sizing * Number(value) + 'rem'
          else return value + unit
        }
        return null
      }
    }
  }
}
