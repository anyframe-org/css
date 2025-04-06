import type { Values } from '@tenoxui/types'

export const values: Values = {
  px: '1px',
  fr: 'minmax(0, 1fr)',
  full: '100%',
  half: '50%',
  vh: '100vh',
  svh: '100svh',
  lvh: '100lvh',
  dvh: '100dvh',
  vw: '100vw',
  svw: '100svw',
  lvw: '100lvw',
  dvw: '100dvw',
  min: 'min-content',
  max: 'max-content',
  fit: 'fit-content',
  'top-right': 'top right',
  'top-left': 'top left',
  'bottom-right': 'top right',
  'bottom-left': 'top left',
  order: {
    first: 'calc(-infinity)',
    last: 'calc(infinity)',
    none: '0'
  },
  'grid-flow': {
    'row-dense': 'row dense',
    'col-dense': 'column dense'
  },
  'container-size': {
    '3xs': '16rem' /* 256px */,
    '2xs': '18rem' /* 288px */,
    xs: '20rem' /* 320px */,
    sm: '24rem' /* 384px */,
    md: '28rem' /* 448px */,
    lg: '32rem' /* 512px */,
    xl: '36rem' /* 576px */,
    '2xl': '42rem' /* 672px */,
    '3xl': '48rem' /* 768px */,
    '4xl': '56rem' /* 896px */,
    '5xl': '64rem' /* 1024px */,
    '6xl': '72rem' /* 1152px */,
    '7xl': '80rem' /* 1280px */
  },
  'default-font-family':
    "var(--default-font-family, ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji')",
  'default-font-mono':
    "var(--default-font-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace)",
  'anc-blur-value': {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '40px',
    '3xl': '64px'
  },
  'anc-border-radius-value': {
    xs: '0.125rem',
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    '4xl': '2rem'
  }
}
