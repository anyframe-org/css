import type { Property } from '@/types/property'
import { defaultProperty } from './DEFAULT'
import { sizingProperty } from './sizing'
import { backgroundProperty } from './background'
import { typographyProperty } from './typography'
import { borderProperty } from './border'
import { shadowProperty } from './shadow'

export const properties = ({ sizing }: { sizing: number }): Property => {
  return {
    ...defaultProperty,
    ...sizingProperty(sizing),
    ...(backgroundProperty as Property),
    ...(typographyProperty(sizing) as Property),
    ...(borderProperty(sizing) as Property),
    ...(shadowProperty as Property)
  }
}
