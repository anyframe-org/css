import type { Classes } from '@tenoxui/types'
import { merge, transformClasses, createSameValue } from '@nousantx/someutils'

export const classBasedStyle: Classes = {
  boxSizing: {
    'box-border': 'border-box',
    'box-content': 'content-box'
  },
  fontStyle: {
    italic: 'italic',
    'not-italic': 'normal'
  },
  textDecorationLine: {
    underline: 'underline',
    overline: 'overline',
    'line-through': 'line-through',
    'no-underline': 'none'
  },
  textDecorationStyle: {
    'decoration-solid': 'solid',
    'decoration-double': 'double',
    'decoration-dotted': 'dotted',
    'decoration-dashed': 'dashed',
    'decoration-wavy': 'wavy'
  },
  textDecorationThickness: {
    'decoration-thickness-from-font': 'from-font',
    'decoration-thickness-auto': 'auto'
  },
  textUnderlineOffset: {
    'underline-offsite-auto': 'auto'
  },
  textTransform: {
    ...createSameValue(['uppercase', 'lowercase', 'capitalize']),
    'normal-case': 'none'
  },
  display: {
    ...createSameValue([
      'inline',
      'block',
      'inline-block',
      'flow-root',
      'flex',
      'inline-flex',
      'grid',
      'inline-grid',
      'contents',
      'table',
      'table-caption',
      'table-cell',
      'table-column',
      'table-column-group',
      'table-footer-group',
      'table-row-group',
      'table-row',
      'list-item'
    ]),
    hidden: 'none'
  },
  position: createSameValue(['static', 'fixed', 'absolute', 'relative', 'sticky']),
  justifyContent: {
    'justify-start': 'flex-start',
    'justify-end': 'flex-end',
    'justify-center': 'center',
    'justify-between': 'space-between',
    'justify-around': 'space-around',
    'justify-evenly': 'space-evenly',
    'justify-stretch': 'stretch',
    'justify-baseline': 'baseline',
    'justify-normal': 'normal'
  },
  justifyItems: {
    'justify-items-start': 'start',
    'justify-items-end': 'end',
    'justify-items-center': 'center',
    'justify-items-stretch': 'stretch',
    'justify-items-normal': 'normal'
  },
  justifySelf: {
    'justify-self-start': 'start',
    'justify-self-end': 'end',
    'justify-self-center': 'center',
    'justify-self-stretch': 'stretch',
    'justify-self-auto': 'auto'
  },
  alignContent: {
    'content-start': 'flex-start',
    'content-end': 'flex-end',
    'content-center': 'center',
    'content-between': 'space-between',
    'content-around': 'space-around',
    'content-evenly': 'space-evenly',
    'content-stretch': 'stretch',
    'content-baseline': 'baseline'
  },
  alignItems: {
    'items-start': 'flex-start',
    'items-end': 'flex-end',
    'items-center': 'center',
    'items-stretch': 'stretch',
    'items-baseline': 'baseline'
  },
  alignSelf: {
    'self-start': 'flex-start',
    'self-end': 'flex-end',
    'self-center': 'center',
    'self-stretch': 'stretch',
    'self-baseline': 'baseline',
    'self-auto': 'auto'
  },
  placeContent: {
    'place-content-start': 'start',
    'place-content-end': 'end',
    'place-content-center': 'center',
    'place-content-between': 'space-between',
    'place-content-around': 'space-around',
    'place-content-evenly': 'space-evenly',
    'place-content-stretch': 'stretch',
    'place-content-baseline': 'baseline'
  },
  placeItems: {
    'place-items-start': 'start',
    'place-items-end': 'end',
    'place-items-center': 'center',
    'place-items-stretch': 'stretch',
    'place-items-baseline': 'baseline'
  },
  placeSelf: {
    'place-self-start': 'start',
    'place-self-end': 'end',
    'place-self-center': 'center',
    'place-self-stretch': 'stretch',
    'place-self-auto': 'auto'
  },
  listStylePosition: {
    'list-inside': 'inside',
    'list-outside': 'outside'
  }
}

export const classes: Classes = merge(
  transformClasses({
    truncate: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    },
    'outline-hidden': {
      outline: '2px solid transparent',
      outlineOffset: '2px'
    }
  }),
  classBasedStyle
)
