import { AnyCSS } from './dist/index.es.js'
import { createConfig } from '@nousantx/tenoxui-preset'
import { TenoxUI as Moxie } from '@tenoxui/moxie'

const { property, values, classes, aliases } = createConfig()

const css = new AnyCSS({
  values: {
    'container-size': {
      '3xl': '48rem'
    }
  }
})

console.log(css.main)

console.log(
  css.render(['w-4', 'w-1rem', 'hover:w-1rem', 'dark:w-6', 'nth-4:w-4', 'max-xl:w-(max:5)'])
)
console.log(
  css.render([
    'w-4',
    'w-1rem',
    'hover:w-1rem',
    'dark:w-6',
    'nth-4:w-4',
    'nth-4:w-3xl',

    'max-xl:w-(max:3xl)'
  ])
)

const ui = new css.engine({
  property: {
    bg: {
      group: 'color',
      property: 'background',
      value: '{0}'
    },
    w: {
      group: 'container-size',
      property: ({ key }) => {
        const keys = {
          min: 'minWidth',
          max: 'maxWidth'
        }

        return keys[key] || 'width'
      },
      value: ({ value, unit }) => value
    }
  },
  values: {
    color: {
      red: 'blue'
    },
    'container-size': {
      '3xl': '48rem'
    }
  }
})

// console.log(ui.process('bg-red w-3xl'))
