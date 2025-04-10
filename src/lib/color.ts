import type { ColorFormat } from '@types'
import { generateColors } from '@nousantx/color-generator'

export const defaultColors = {
  red: '#f60410',
  orange: '#d85900',
  amber: '#d68200',
  yellow: '#ca9600',
  lime: '#69af00',
  green: '#00aa45',
  emerald: '#009f6a',
  teal: '#009e8d',
  cyan: '#009cb9',
  sky: '#008cce',
  blue: '#0064fc',
  indigo: '#2c29ff',
  violet: '#6c1dff',
  purple: '#9714ff',
  fuchsia: '#d604f4',
  pink: '#f20984',
  rose: '#f3003b',
  slate: '#304d76',
  gray: '#34486f',
  zinc: '#606068',
  neutral: '#505050',
  stone: '#544e4a'
}

export const colorLib = ({
  output = 'oklch',
  colors = {}
}: {
  output: ColorFormat
  colors: { [hex: string]: string }
}): any =>
  generateColors({
    color: colors,
    option: {
      format: 'object2',
      output
    }
  })
