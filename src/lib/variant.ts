import type { Property } from '@tenoxui/moxie'
import type { Variants } from '../types'

export const defaultVariants: Variants = {
  dark: '@media (prefers-color-scheme: dark)'
}

export const defaultCustomVariants = {
  supports: ({ key, value }) => `value:@supports (${key}: ${value})`,
  'not-supports': ({ key, value }) => `value:@supports not (${key}: ${value})`,
  nth: ({ value }) => `value:&:nth-child(${value})`,
  min: ({ value, unit }) => `value:@media (width >= ${value}${unit})`,
  max: ({ value, unit }) => `value:@media (width < ${value}${unit})`
} as Property
