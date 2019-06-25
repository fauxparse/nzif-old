import { select } from '@storybook/addon-knobs'
import ICONS from '../atoms/icon/all'

const iconOptions = () => ICONS.reduce(
  (options, name) => ({ ...options, [name]: name }),
  { '(none)': null }
)

export const icon = (label = 'Icon', defaultValue = ICONS[0]) =>
  select(label, iconOptions(), defaultValue)

export const PALETTE = {
  grey: {
    100: 'hsl(206, 28%, 95%)',
    200: 'hsl(208, 30%, 91%)',
    300: 'hsl(210, 22%, 84%)',
    400: 'hsl(212, 18%, 73%)',
    500: 'hsl(214, 16%, 60%)',
    600: 'hsl(215, 17%, 45%)',
    700: 'hsl(218, 18%, 30%)',
    800: 'hsl(221, 22%, 20%)',
    900: 'hsl(222, 25%, 10%)',
  },
  tomato: {
    100: 'hsl(11, 100%, 90%)',
    200: 'hsl(8, 95%, 85%)',
    300: 'hsl(6, 91%, 75%)',
    400: 'hsl(5, 89%, 68%)',
    500: 'hsl(4, 85%, 57%)',
    600: 'hsl(3, 88%, 41%)',
    700: 'hsl(2, 90%, 30%)',
    800: 'hsl(1, 92%, 22%)',
    900: 'hsl(0, 94%, 15%)',
  },
  mandarin: {
    100: 'hsl(41, 98%, 90%)',
    200: 'hsl(38, 96%, 75%)',
    300: 'hsl(36, 95%, 62%)',
    400: 'hsl(35, 90%, 49%)',
    500: 'hsl(34, 95%, 43%)',
    600: 'hsl(33, 95%, 34%)',
    700: 'hsl(31, 96%, 31%)',
    800: 'hsl(28, 97%, 26%)',
    900: 'hsl(25, 98%, 20%)',
  },
  grape: {
    100: 'hsl(270, 54%, 90%)',
    200: 'hsl(266, 51%, 80%)',
    300: 'hsl(263, 48%, 72%)',
    400: 'hsl(261, 46%, 65%)',
    500: 'hsl(260, 44%, 60%)',
    600: 'hsl(259, 43%, 52%)',
    700: 'hsl(257, 45%, 40%)',
    800: 'hsl(254, 49%, 28%)',
    900: 'hsl(250, 54%, 20%)',
  },
  plum: {
    100: 'hsl(324, 89%, 94%)',
    200: 'hsl(328, 88%, 88%)',
    300: 'hsl(332, 87%, 78%)',
    400: 'hsl(335, 86%, 67%)',
    500: 'hsl(335, 85%, 55%)',
    600: 'hsl(336, 86%, 43%)',
    700: 'hsl(338, 88%, 37%)',
    800: 'hsl(341, 90%, 30%)',
    900: 'hsl(345, 94%, 20%)',
  },
  apple: {
    100: 'hsl(115, 65%, 88%)',
    200: 'hsl(111, 60%, 76%)',
    300: 'hsl(109, 56%, 62%)',
    400: 'hsl(107, 53%, 48%)',
    500: 'hsl(106, 51%, 38%)',
    600: 'hsl(106, 50%, 32%)',
    700: 'hsl(108, 52%, 28%)',
    800: 'hsl(111, 54%, 22%)',
    900: 'hsl(115, 58%, 15%)',
  },
  mint: {
    100: 'hsl(180, 85%, 92%)',
    200: 'hsl(178, 78%, 80%)',
    300: 'hsl(179, 70%, 51%)',
    400: 'hsl(178, 94%, 38%)',
    500: 'hsl(177, 100%, 31%)',
    600: 'hsl(176, 100%, 25%)',
    700: 'hsl(174, 100%, 21%)',
    800: 'hsl(171, 100%, 18%)',
    900: 'hsl(167, 100%, 15%)',
  },
}

const colorOptions = (value = 500) => Object.keys(PALETTE).reduce(
  (options, name) => ({ ...options, [name]: PALETTE[name][value] }),
  { '(none)': null }
)

export const color = (label = 'Color', defaultValue = null) =>
  select(label, colorOptions(), defaultValue)
