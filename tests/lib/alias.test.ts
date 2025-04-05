import x from '@/index.ts'
import { test, expect } from 'vitest'

let ui = new x({ alias: { v: 'bg-red hover:bg-blue' } })

test('Rules generation from alias', () => {
  expect(ui.render('v')).toContain('.v {')
  expect(ui.render('v')).toContain('background: red')
  expect(ui.render('v')).toContain('&:hover { background: blue')
})
