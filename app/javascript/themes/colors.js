import chroma from 'chroma-js'
import generate from 'lyft-coloralgorithm'

const CURVES = [
  {
    name: 'tomato',
    hue_start: 4,
    hue_end: 4,
    sat_start: 15,
    sat_end: 72,
    sat_rate: 130,
    lum_start: 100,
    lum_end: 72,
  },
  {
    name: 'mandarin',
    hue_start: 33,
    hue_end: 24,
    sat_start: 23,
    sat_end: 81,
    sat_rate: 125,
    lum_start: 100,
    lum_end: 58,
    lum_curve: 'easeInOutQuad',
  },
  {
    name: 'grape',
    hue_start: 260,
    hue_end: 260,
    sat_start: 15,
    sat_end: 100,
    sat_rate: 57,
    lum_start: 86,
    lum_end: 44,
  },
  {
    name: 'plum',
    hue_start: 335,
    hue_end: 320,
    hue_curve: 'easeInQuad',
    sat_start: 24,
    sat_end: 81,
    sat_rate: 107,
    lum_start: 100,
    lum_end: 64,
  },
  {
    name: 'mint',
    hue_start: 174,
    hue_end: 185,
    sat_start: 20,
    sat_end: 100,
    sat_rate: 100,
    lum_start: 95,
    lum_end: 25,
    lum_curve: 'easeInOutQuad',
  },
  {
    name: 'apple',
    hue_start: 106,
    hue_end: 126,
    hue_curve: 'easeInQuad',
    sat_start: 23,
    sat_end: 100,
    sat_rate: 87,
    lum_start: 84,
    lum_end: 34,
    lum_curve: 'easeInOutQuad',
  },
  {
    name: 'grey',
    hue_start: 235,
    hue_end: 235,
    sat_start: 8,
    sat_end: 12,
    sat_rate: 100,
    sat_curve: 'easeInQuad',
    lum_start: 98,
    lum_end: 9,
    lum_curve: 'easeInOutQuad',
  }
]

const DEFAULTS = {
  steps: 7,
  modifier: 100,
  lum_curve: 'easeOutQuad',
  sat_curve: 'easeOutQuad',
  hue_curve: 'easeOutQuad',
}

const generateColor = spec =>
  generate({ specs: { ...DEFAULTS, ...spec } }).reduce((scale, color) => ({
    ...scale,
    [color.label + 100]: color.hex,
  }), {})

const palette = CURVES.reduce(
  (palette, spec) => ({ ...palette, [spec.name]: generateColor(spec) }),
  {}
)

const accent = palette.tomato[400]

const brand = {
  accent,
  background: 'white',
  text: palette.grey[700],
  outline: chroma(accent).alpha(0.25).css(),
  ripple: palette.grey[300],
}

export default {
  palette,
  ...brand,
}
