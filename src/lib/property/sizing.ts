import type { GetCSSProperty } from '@tenoxui/types'
import type { PropertyValue, Property } from '@tenoxui/moxie'
import { is } from '@nousantx/someutils'
import { toKebabCase } from '@/utils/toKebabCase'

const sizingPropertyMap: Record<string, GetCSSProperty> = {
  w: 'width',
  h: 'height',
  'min-w': 'minWidth',
  'max-w': 'maxWidth',
  'min-h': 'minHeight',
  'max-h': 'maxHeight',
  size: ['width', 'height'],
  top: 'top',
  right: 'right',
  bottom: 'bottom',
  left: 'left',
  inset: 'inset',
  gap: 'gap',
  'gap-x': 'columnGap',
  'gap-y': 'rowGap',
  m: 'margin',
  mt: 'marginTop',
  mr: 'marginRight',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mx: 'marginInline',
  my: 'marginBlock',
  ms: 'marginInlineStart',
  me: 'marginInlineEnd',
  p: 'padding',
  pt: 'paddingTop',
  pr: 'paddingRight',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  py: 'paddingBlock',
  px: 'paddingInline',
  'scroll-m': 'scrollMargin',
  'scroll-mx': 'scrollMarginInline',
  'scroll-my': 'scrollMarginBlock',
  'scroll-ms': 'scrollMarginInlineStart',
  'scroll-me': 'scrollMarginInlineEnd',
  'scroll-mt': 'scrollMarginTop',
  'scroll-ml': 'scrollMarginLeft',
  'scroll-mb': 'scrollMarginBottom',
  'scroll-mr': 'scrollMarginRight',
  'scroll-p': 'scrollPadding',
  'scroll-px': 'scrollPaddingInline',
  'scroll-py': 'scrollPaddingBlock',
  'scroll-ps': 'scrollPaddingInlineStart',
  'scroll-pe': 'scrollPaddingInlineEnd',
  'scroll-pt': 'scrollPaddingTop',
  'scroll-pl': 'scrollPaddingLeft',
  'scroll-pb': 'scrollPaddingBottom',
  'scroll-pr': 'scrollPaddingRight'
}

export const sizingProperty = (sizing: number): Property => {
  const create = (propertyName: GetCSSProperty) =>
    ({
      group: 'container-size',
      property: ({ value, unit, key, secondValue }) => {
        if (!value || key || secondValue) return null

        const finalValue = is.length.test(value)
          ? value
          : is.number.test(value + unit)
            ? value + unit !== '0'
              ? sizing * Number(value) + 'rem'
              : '0'
            : value + unit

        if (Array.isArray(propertyName)) {
          return 'value:' + propertyName.map((p) => toKebabCase(p) + ': ' + finalValue).join('; ')
        }

        return `value:${toKebabCase(propertyName as string)}: ${finalValue}`
      }
    }) as PropertyValue

  const properties: Property = {}

  Object.entries(sizingPropertyMap).forEach(([key, prop]) => {
    properties[key] = create(prop)
  })

  return properties
}
