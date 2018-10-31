/* global module */

import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import ripple from './ripple'

storiesOf('Effects', module)
  .addDecorator(withKnobs)
  .add('Ripple', ripple)
