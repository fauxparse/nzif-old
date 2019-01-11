const sizes = [
  12, // -2
  14, // -1
  16, //  0 (base size = 16pt)
  18, // +1
  20, // +2
  24, // +3
  32, // +4
  36, // +5
  40, // +6
  48, // +7
  60, // +8
  72, // +9
]

export const BASE_SIZE = 2

const lineHeights = {
  loose:   2.0,
  relaxed: 1.75,
  normal:  1.5,
  tight:   1.25,
  none:    1.0,
}

export default {
  base: 'Work Sans',
  branding: 'Brother',
  scale: step => `${Math.pow(1.2, step)}em`,
  sizes,
  size: size => `${sizes[size + BASE_SIZE] / 16.0}rem`,
  lineHeights,
  lineHeight: lineHeights.normal,
  weights: {
    light: 300,
    normal: 400,
    bold: 600,
    black: 700,
  },
}
