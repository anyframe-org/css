export const createColor = (value: string, secondValue?: string, secondUnit?: string) =>
  ['inherit', 'current', 'black', 'white', 'transparent'].includes(value)
    ? value === 'current'
      ? 'currentColor'
      : value
    : value.includes('(') && value.endsWith(')')
    ? `${value.slice(0, -1)}${secondValue ? ' / ' + secondValue + (secondUnit || '%)') : ')'}`
    : value + secondValue
