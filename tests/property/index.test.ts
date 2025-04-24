import { AnyCSS } from '@/index.ts'
import { describe, it, expect } from 'vitest'
import { classNames } from './single'

describe('Classes generation test', () => {
  const ui = new AnyCSS({
    valueAlias: {
      'my-size': '10px'
    }
  })

  it('should render correct css properties from inputted data', () => {
    Object.entries(classNames).forEach(([property, classTests]) => {
      Object.entries(classTests).forEach(([className, expectedValue]) => {
        const rendered = ui.render(className)

        expect(rendered).toContain(`${ui.main.toKebabCase(property)}: ${expectedValue}`)
      })
    })
  })
})
