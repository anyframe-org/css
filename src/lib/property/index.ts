import type { Property } from '@tenoxui/moxie'
import { defaultProperty } from './DEFAULT'
import { sizingProperty } from './sizing'
import { backgroundProperty } from './background'
import { typographyProperty } from './typography'
import { borderProperty } from './border'
import { shadowProperty } from './shadow'
import { filterProperty } from './filter'
import { transitionProperty } from './transition'
import { transformProperty } from './transform'
import { interactivityProperties } from './interactivity'

export const properties = ({ sizing }: { sizing: number }): Property => {
  return {
    ...defaultProperty,
    ...sizingProperty(sizing),
    ...(backgroundProperty as Property),
    ...(typographyProperty(sizing) as Property),
    ...(borderProperty(sizing) as Property),
    ...(shadowProperty as Property),
    ...(filterProperty(sizing) as Property),
    ...(transitionProperty as Property),
    ...(interactivityProperties as Property),
    ...(transformProperty(sizing) as Property)
  }
}
