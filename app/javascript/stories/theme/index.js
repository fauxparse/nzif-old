/* global module */

import { storiesOf } from '@storybook/react'
import Background from './background'
import Colors from './colors'
import Icons from './icons'

storiesOf('Theme', module)
  .add('Background', Background)
  .add('Colours', Colors)
  .add('Icons', Icons)
