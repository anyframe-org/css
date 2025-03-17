import type { Property } from '@/types/property'
import { defaultProperty } from './DEFAULT'
import { sizingProperty } from './sizing'
import { backgroundProperty } from './background'
import { typographyProperty } from './typography'
import { borderProperty } from './border'
import { shadowProperty } from './shadow'
import { transitionProperty } from './transition'
import { transformProperty } from './transform'

export const properties = ({ sizing }: { sizing: number }): Property => {
  return {
    ...defaultProperty,
    ...sizingProperty(sizing),
    ...(backgroundProperty as Property),
    ...(typographyProperty(sizing) as Property),
    ...(borderProperty(sizing) as Property),
    ...(shadowProperty as Property),
    ...(transitionProperty as Property),
    ...(transformProperty(sizing) as Property)
  }
}
