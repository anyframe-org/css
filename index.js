import { AnyCSS } from './dist/index.es.js'

const css = new AnyCSS({
  colorVariant: 'rgb'
})

console.log(
  css.render([
    'shadow-lg',
    'top-4',
    'flex',
    'hover:flex',
    'hover:fixed',
    'flex-col',
    'flex-row',
    'hover:flex-row',
    'sm:flex-row',

    /* hshdud */
  ])
)

// console.log(css.main.property)
