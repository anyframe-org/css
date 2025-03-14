export const alias: Record<string, string> = {
  isolate: 'isolation-isolate',
  // flex direction
  'flex-row': '[flex-direction]-row',
  'flex-col': '[flex-direction]-column',
  'flex-row-reverse': '[flex-direction]-row-reverse',
  'flex-col-reverse': '[flex-direction]-column-reverse',
  // flex wrap
  'flex-wrap': '[flex-wrap]-wrap',
  'flex-nowrap': '[flex-wrap]-nowrap',
  'flex-wrap-reverse': '[flex-wrap]-wrap-reverse',
  // columns
  'grid-cols-none': 'grid-cols-[none]',
  'grid-cols-subgrid': 'grid-cols-[subgrid]',
  'col-span-full': 'col-span-[1_/_-1]',
  'col-start-auto': 'col-start-[auto]',
  'col-end-auto': 'col-end-[auto]',
  // row
  'grid-rows-none': 'grid-rows-[none]',
  'grid-rows-subgrid': 'grid-rows-[subgrid]',
  'row-span-full': 'row-span-[1_/_-1]',
  'row-start-auto': 'row-start-[auto]',
  'row-end-auto': 'row-end-[auto]'
}
