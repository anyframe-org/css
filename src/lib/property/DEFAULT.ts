import type { Property } from '@tenoxui/moxie'

export const defaultProperty: Property = {
  columns: 'columns',
  align: 'verticalAlign',
  whitespace: 'whiteSpace',
  hypehns: 'hyphens',
  content: 'content',
  isolation: 'isolation',
  order: 'order',
  z: 'zIndex',
  opacity: {
    property: 'opacity',
    value: '{0}%'
  },
  'outline-offset': {
    property: 'outlineOffset',
    value: '{0}px'
  },
  // grid cols
  'grid-cols': {
    property: 'gridTemplateColumns',
    value: 'repeat({0}, minmax(0, 1fr))'
  },
  'col-span': {
    property: 'gridColumn',
    value: 'span {0} / span {0}'
  },
  col: 'gridColumn',
  'col-start': 'gridColumnStart',
  'col-end': 'gridColumnEnd',
  // grid rows
  'grid-rows': {
    property: 'gridTemplateRows',
    value: 'repeat({0}, minmax(0, 1fr))'
  },
  'row-span': {
    property: 'gridRow',
    value: 'span {0} / span {0}'
  },
  row: 'gridRow',
  'row-start': 'gridRowStart',
  'row-end': 'gridRowEnd',
  // grid auto
  'grid-flow': 'gridAutoFlow',
  'auto-cols': 'gridAutoColumns',
  'auto-rows': 'gridAutoRows',

  filter: 'filter',
  'backdrop-filter': 'backdropFilter'
}
