import { AnyCSS } from '@/index.ts'
import { describe, it, expect } from 'vitest'

describe('AnyFrame CSS Unit Test', () => {
  let ui = new AnyCSS()

  it('should do things...', () => {
    expect(ui.render('flex')).toContain('display: flex')
    expect(ui.render('bg-red-500')).toContain('background-color: oklch(')
  })
})
