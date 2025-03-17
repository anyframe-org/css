import type { ApplyStyleObject } from '@types'

export const variables: ApplyStyleObject = {
  ':root': `
    [--tui-inset-shadow]-[0_0_#0000]
    [--tui-inset-ring-shadow]-[0_0_#0000]
    [--tui-shadow]-[0_0_#0000]
    [--tui-ring-shadow]-[0_0_#0000]
    [--tui-ring-offset-shadow]-[0_0_#0000]
    [--tui-ring-offset-width]-0px
    [--tui-ring-inset]-[_]
    [--tui-ring-offset-color]-#fff
    [--ease-in]-[cubic-bezier(0.4,_0,_1,_1)]
    [--ease-out]-[cubic-bezier(0,_0,_0.2,_1)]
    [--ease-in-out]-[cubic-bezier(0.4,_0,_0.2,_1)]
    [--default-transition-duration]-150ms
    [--default-transition-timing-function]-[cubic-bezier(0.4,_0,_0.2,_1)]
  `
}
