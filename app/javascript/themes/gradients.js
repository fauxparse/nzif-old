import colors from './colors'

const gradient = (from, to) =>
  `linear-gradient(to right bottom, ${from}, ${to})`

export default {
  primary: gradient(colors.palette.tomato[400], colors.palette.mandarin[400]),
}
