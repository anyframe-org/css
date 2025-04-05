import { merge, transformClasses } from '@nousantx/someutils'
import { display } from './display'
import { background } from './background'
import { border } from './border'
import { typography } from './typography'

export const classNames = merge(
  {
    display,
    ...background,
    ...border,
    ...typography,
  },
  transformClasses({
    'text-xl/loose': {
      fontSize: '1.25rem',
      lineHeight: '2'
    },
    'text-xl': {
      fontSize: '1.25rem',
      lineHeight: 'calc(1.75 / 1.25)'
    }
  })
)
