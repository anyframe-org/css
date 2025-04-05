import { AnyCSS } from '@/index.ts'
import { classBasedStyle } from '@/lib/classes.ts'
import { describe, it, expect } from 'vitest'

describe('Classes generation test', () => {
  const ui = new AnyCSS()

  it('should apply classes correctly', () => {
    expect(ui.render('flex')).toContain('.flex {\n  display: flex\n}')
    expect(ui.render('hover:flex')).toContain('.hover\\:flex {\n  &:hover { display: flex }\n}')
    expect(ui.render('md:line-through')).toContain(
      `.md\\:line-through {\n  @media (width >= 48rem) {\n    text-decoration-line: line-through\n  }\n}`
    )
  })

  it('should render correct css properties from ', () => {
    Object.entries(classBasedStyle).forEach(([property, classTests]) => {
      Object.entries(classTests).forEach(([className, expectedValue]) => {
        const rendered = ui.render(className)

        expect(rendered).toContain(
          `.${className} {\n  ${ui.main.toKebabCase(property)}: ${expectedValue}\n}`
        )
      })
    })
  })

  it('should generate custom utilityFirst classes', () => {
    const css = new AnyCSS({
      utilityClass: {
        display: {
          'my-display': 'flex'
        }
      }
    })

    expect(css.render('my-display')).toContain('display: flex')
    expect(css.render('hover:my-display')).toContain('&:hover { display: flex }')
    expect(css.render('md:my-display')).toContain('  @media (width >= 48rem) {\n    display: flex')
  })

  it('should generate custom utilityStyle classes', () => {
    const css = new AnyCSS({
      utilityStyle: {
        'my-display': {
          display: 'flex'
        }
      }
    })

    expect(css.render('my-display')).toContain('display: flex')
    expect(css.render('hover:my-display')).toContain('&:hover { display: flex }')
    expect(css.render('md:my-display')).toContain('  @media (width >= 48rem) {\n    display: flex')
  })

  it('should pass box-sizing', () => {
    expect(ui.render('box-border')).toContain('box-sizing: border-box')
    expect(ui.render('box-content')).toContain('box-sizing: content-box')
  })
  it('should pass font-style', () => {
    expect(ui.render('italic')).toContain('font-style: italic')
    expect(ui.render('not-italic')).toContain('font-style: normal')
  })
  it('should pass some text-transform', () => {
    expect(ui.render('uppercase')).toContain('text-transform: uppercase')
    expect(ui.render('normal-case')).toContain('text-transform: none')
  })
  it('should pass some display property', () => {
    expect(ui.render('flex')).toContain('display: flex')
    expect(ui.render('inline-flex')).toContain('display: inline-flex')
    expect(ui.render('hidden')).toContain('display: none')
    expect(ui.render('md:hidden')).toContain('@media (width >= 48rem) {\n    display: none')
  })
  it('should pass some position property', () => {
    expect(ui.render('fixed')).toContain('position: fixed')
    expect(ui.render('relative')).toContain('position: relative')
  })
  it('should pass some classes from custom utilityStyle', () => {
    expect(ui.render('truncate')).toContain(
      'overflow: hidden; text-overflow: ellipsis; white-space: nowrap'
    )
  })
})
