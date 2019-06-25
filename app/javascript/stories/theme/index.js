/* global module */

import { storiesOf } from '@storybook/react'
import Background from './background'
import Colors from './colors'
import Fonts from './fonts'

storiesOf('Theme', module)
  .add('Background', Background)
  .add('Colours', Colors)
  .add('Fonts', Fonts)
