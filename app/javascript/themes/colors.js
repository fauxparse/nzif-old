import chroma from 'chroma-js'
import reduce from 'lodash/reduce'

const color = (...shades) => (shade = 500, alpha = 1.0) => {
  const [h, s, l] = shades[(shade / 100) - 1]
  return `hsla(${h}, ${s}%, ${l}%, ${alpha})`
}

const palette = {
  grey: color(
    [206, 28, 95],
    [208, 30, 91],
    [210, 22, 84],
    [212, 18, 73],
    [214, 16, 60],
    [215, 17, 45],
    [218, 18, 30],
    [221, 22, 20],
    [222, 25, 10],
  ),
  tomato: color(
    [11, 100, 90],
    [8, 95, 85],
    [6, 91, 75],
    [5, 89, 68],
    [4, 85, 57],
    [3, 88, 41],
    [2, 90, 30],
    [1, 92, 22],
    [0, 94, 15],
  ),
  mandarin: color(
    [41, 98, 90],
    [38, 96, 75],
    [36, 95, 62],
    [35, 90, 49],
    [34, 95, 43],
    [33, 95, 34],
    [31, 96, 31],
    [28, 97, 26],
    [25, 98, 20],
  ),
  grape: color(
    [270, 54, 90],
    [266, 51, 80],
    [263, 48, 72],
    [261, 46, 65],
    [260, 44, 60],
    [259, 43, 52],
    [257, 45, 40],
    [254, 49, 28],
    [250, 54, 20],
  ),
  plum: color(
    [324, 89, 94],
    [328, 88, 88],
    [332, 87, 78],
    [335, 86, 67],
    [335, 85, 55],
    [336, 86, 43],
    [338, 88, 37],
    [341, 90, 30],
    [345, 94, 20],
  ),
  apple: color(
    [115, 65, 88],
    [111, 60, 76],
    [109, 56, 62],
    [107, 53, 48],
    [106, 51, 38],
    [106, 50, 32],
    [108, 52, 28],
    [111, 54, 22],
    [115, 58, 15],
  ),
  mint: color(
    [180, 85, 92],
    [178, 78, 80],
    [179, 70, 51],
    [178, 94, 38],
    [177, 100, 31],
    [176, 100, 25],
    [174, 100, 21],
    [171, 100, 18],
    [167, 100, 15],
  )
}

const alpha = {
  primary: 0.875,
  secondary: 0.625,
  disabled: 0.375,
  hover: 0.375,
  border: 0.25,
}

const background = '#ffffff'
const foreground = palette.grey(900)
const accent = palette.tomato(500)
const link = palette.tomato(600)
const error = palette.tomato(700)
const text = palette.grey(900, alpha.primary)
const secondary = palette.grey(900, alpha.secondary)
const disabled = palette.grey(900, alpha.disabled)
const border = palette.grey(900, alpha.border)
const hoverBackground = palette.tomato(500, alpha.hover)

const brand = {
  accent,
  background,
  modalBackground: background,
  border,
  error,
  foreground,
  hoverBackground,
  text,
  secondary,
  disabled,
  link,
  outline: palette.tomato(500, 0.25),
  ripple: palette.grey(300),
  scrim: palette.grey(900, 0.625),
}

export default {
  alpha,
  palette,
  ...palette,
  ...brand,
}
