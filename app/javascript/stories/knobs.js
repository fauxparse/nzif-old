import { select } from '@storybook/addon-knobs'
import toPairs from 'lodash/toPairs'
import ICONS from '../atoms/icon/all'

import colors from '../styles/theme/_colors.scss'

const iconOptions = () => ICONS.reduce(
  (options, name) => ({ ...options, [name]: name }),
  { '(none)': null }
)

export const icon = (label = 'Icon', defaultValue = ICONS[0]) =>
  select(label, iconOptions(), defaultValue)

export const PALETTE = toPairs(colors).reduce((map, [name, value]) => {
  const [_, color, shade] = name.match(/^(.+)(\d+)$/)
  return { ...map, [color]: { ...map[color], [shade]: value } }
}, {})

const colorOptions = (value = 500) => Object.keys(PALETTE).reduce(
  (options, name) => ({ ...options, [name]: PALETTE[name][value] }),
  { '(none)': null }
)

export const color = (label = 'Color', defaultValue = null) =>
  select(label, colorOptions(), defaultValue)
