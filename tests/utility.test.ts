import { AnyCSS } from '@/index.ts'
import { TenoxUI } from '@tenoxui/moxie'
import { describe, it, expect } from 'vitest'

describe('AnyFrame CSS Unit Test', () => {
  let ui = new AnyCSS()

  it('should add indentation correctly', () => {
    expect(`body {\n${ui.addTabs('display: flex', 6, true)}\n}`).toBe(
      'body {\n      display: flex\n}'
    )
    expect(`body {\n${ui.addTabs('display: flex')}\n}`).toBe('body {\n  display: flex\n}')
  })
  it('should createing new engine', () => {
    const css = ui.createEngine()
    expect(css).toBeInstanceOf(TenoxUI)
  })
  it('should generate css rules without selector', () => {
    let ui = new AnyCSS({
      alias: {
        btn: '[--red]-blue hover:bg-$red'
      }
    })
    expect(ui.generateRulesFromClass('bg-red')).toBe('background: red;')
    expect(ui.generateRulesFromClass('[--red]-blue bg-$red')).toBe(
      '--red: blue;\nbackground: var(--red);'
    )
    expect(ui.generateRulesFromClass('[--red]-blue hover:bg-$red')).toBe(
      '--red: blue;\n&:hover { background: var(--red) }'
    )
    expect(ui.generateRulesFromClass('btn')).toBe(
      '--red: blue;\n&:hover { background: var(--red) }'
    )
    expect(ui.generateRulesFromClass('btn', 'hover')).toBe('--red: blue;\n')
  })
  it('should handle layering correctly', () => {
    ui.addLayer('reset')
    expect(ui.layers.has('reset')).toBe(true)
    expect(ui.layerOrder).toStrictEqual(['theme', 'base', 'components', 'utilities', 'reset'])
    ui.setLayerOrder(['reset', 'utilities', 'theme', 'components', 'base'])
    expect(ui.layerOrder).toStrictEqual(['reset', 'utilities', 'theme', 'components', 'base'])
    ui.removeLayer('reset')
    expect(ui.layers.has('reset')).toBe(false)
  })
  it('should compute prefixes correctly', () => {
    expect(ui.getPseudoSyntax('hover')).toBe(':')
    expect(ui.getPseudoSyntax('focus')).toBe(':')
    expect(ui.getPseudoSyntax('before')).toBe('::')
    expect(ui.getPseudoSyntax('placeholder')).toBe('::')
    // breakpoint prefix
    expect(ui.getBreakpointQuery('md')).toBe('@media (width >= 48rem)')
    expect(ui.getBreakpointQuery('min-md')).toBe('@media (width >= 48rem)')
    expect(ui.getBreakpointQuery('max-md')).toBe('@media (width < 48rem)')
    // custom prefixes
    ui = new AnyCSS({
      customVariants: {
        hx: ({ value }) => {
          return `value:${value}:hover &`
        }
      }
    })
    expect(ui.isCustomPrefix('hx-[.anc]')).toBe(true)
    expect(ui.processCustomPrefix('hx-[.anc]')).toBe('.anc:hover &')
  })
  it('should format styles correctly', () => {
    expect(ui.formatRules(ui.formatRules('background: red'))).toBe('background: red')
    expect(ui.formatRules(ui.formatRules(['background'], 'red'))).toBe('background: red')
  })
  it('should generate selector correctly', () => {
    expect(ui.createSelector(ui.createSelector('bg-red', null, true))).toBe('.bg-red')
    expect(ui.createSelector(ui.createSelector('bg-red', 'hover', true))).toBe('.hover\\\\:bg-red')
  })
  it('should generate css rules wrapper with prefixes correctly', () => {
    expect(ui.generateCSSWrapper('hover', 'background', ': red')).toBe(
      '&:hover { background: red }'
    )
  })
  it('should render rules correctly', () => {
    expect(ui.render('bg-red')).toBe('.bg-red {\n  background: red\n}\n')
    expect(ui.render('flex')).toBe('.flex {\n  display: flex\n}\n')
    expect(ui.render('md:flex')).toBe(
      '.md\\:flex {\n  @media (width >= 48rem) {\n    display: flex\n  }\n}\n'
    )
    expect(ui.render('hover:bg-red')).toBe('.hover\\:bg-red {\n  &:hover { background: red }\n}\n')
    expect(ui.render('hover:bg-red')).toBe('.hover\\:bg-red {\n  &:hover { background: red }\n}\n')

    ui = new AnyCSS({
      safelist: ['[background]-red']
    })
    expect(ui.render()).toBe(`.\\[background\\]-red {
  background: red
}\n`)
    expect(ui.render('[background]-blue')).toBe(`.\\[background\\]-red {
  background: red
}
.\\[background\\]-blue {
  background: blue
}\n`)
  })
})
