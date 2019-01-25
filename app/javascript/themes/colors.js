import Palette from '../lib/palette'

export const palette = new Palette({
  grey: {
    '100': [206, 28, 95],
    '200': [208, 30, 91],
    '300': [210, 22, 84],
    '400': [212, 18, 73],
    '500': [214, 16, 60],
    '600': [215, 17, 45],
    '700': [218, 18, 30],
    '800': [221, 22, 20],
    '900': [222, 25, 10],
  },
  tomato: {
    '100': [11, 100, 90],
    '200': [8, 95, 85],
    '300': [6, 91, 75],
    '400': [5, 89, 68],
    '500': [4, 85, 57],
    '600': [3, 88, 41],
    '700': [2, 90, 30],
    '800': [1, 92, 22],
    '900': [0, 94, 15],
  },
  mandarin: {
    '100': [41, 98, 90],
    '200': [38, 96, 75],
    '300': [36, 95, 62],
    '400': [35, 90, 49],
    '500': [34, 95, 43],
    '600': [33, 95, 34],
    '700': [31, 96, 31],
    '800': [28, 97, 26],
    '900': [25, 98, 20],
  },
  grape: {
    '100': [270, 54, 90],
    '200': [266, 51, 80],
    '300': [263, 48, 72],
    '400': [261, 46, 65],
    '500': [260, 44, 60],
    '600': [259, 43, 52],
    '700': [257, 45, 40],
    '800': [254, 49, 28],
    '900': [250, 54, 20],
  },
  plum: {
    '100': [324, 89, 94],
    '200': [328, 88, 88],
    '300': [332, 87, 78],
    '400': [335, 86, 67],
    '500': [335, 85, 55],
    '600': [336, 86, 43],
    '700': [338, 88, 37],
    '800': [341, 90, 30],
    '900': [345, 94, 20],
  },
  apple: {
    '100': [115, 65, 88],
    '200': [111, 60, 76],
    '300': [109, 56, 62],
    '400': [107, 53, 48],
    '500': [106, 51, 38],
    '600': [106, 50, 32],
    '700': [108, 52, 28],
    '800': [111, 54, 22],
    '900': [115, 58, 15],
  },
  mint: {
    '100': [180, 85, 92],
    '200': [178, 78, 80],
    '300': [179, 70, 51],
    '400': [178, 94, 38],
    '500': [177, 100, 31],
    '600': [176, 100, 25],
    '700': [174, 100, 21],
    '800': [171, 100, 18],
    '900': [167, 100, 15],
  },
})

const alpha = {
  primary: 0.875,
  secondary: 0.625,
  disabled: 0.375,
  hover: 0.375,
  border: 0.25,
}

const background = palette.white()
const foreground = palette.grey(900)
const accent = palette.tomato(500)
const highlight = palette.tomato(300)
const link = palette.tomato(600)
const error = palette.tomato(700)
const text = palette.grey(900, alpha.primary)
const secondary = palette.grey(900, alpha.secondary)
const disabled = palette.grey(900, alpha.disabled)
const border = palette.grey(900, alpha.border)
const hoverBackground = palette.tomato(500, alpha.hover)
const panelBackground = palette.grey(100)

const brand = {
  accent,
  highlight,
  background,
  modalBackground: background,
  border,
  error,
  foreground,
  hoverBackground,
  panelBackground,
  text,
  secondary,
  disabled,
  link,
  outline: palette.tomato(500, 0.25),
  ripple: palette.grey(300),
  scrim: palette.grey(900, 0.625),
  beginner: palette.mint(),
  intermediate: palette.grape(),
  advanced: palette.plum(),
  icon: palette.grey(400),
}

export default {
  alpha,
  palette,
  ...palette.functions(),
  ...brand,
}
