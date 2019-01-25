import { select } from '@storybook/addon-knobs'
import icons from '../components/icons/all'
import colors from '../themes/colors'

const iconOptions = () => icons.reduce(
  (options, name) => ({ ...options, [name]: name }),
  { '(none)': null }
)

export const icon = (label = 'Icon', defaultValue = icons[0]) =>
  select(label, iconOptions(), defaultValue)

const colorOptions = (value = 500) => colors.palette.names().reduce(
  (options, name) => ({ ...options, [name]: colors.palette.color(name, value).toString() }),
  { '(none)': null }
)

export const color = (label = 'Color', defaultValue = null) =>
  select(label, colorOptions(), defaultValue)
