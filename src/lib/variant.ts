import type { Property } from '@tenoxui/moxie'
import type { Variants } from '../types'

export const defaultVariants: Variants = {
  dark: '@media (prefers-color-scheme: dark)'
}

export const defaultCustomVariants = {
  support: ({ key, value }) => `value:@supports (${key}: ${value})`,
  'not-support': ({ key, value }) => `value:@supports not (${key}: ${value})`,
  nth: ({ value }) => `&:nth-child(${value})`,
  min: ({ value, unit }) => `@media (width >= ${value}${unit})`,
  max: ({ value, unit }) => `@media (width < ${value}${unit})`
} as Property
