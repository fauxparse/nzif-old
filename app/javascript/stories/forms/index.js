/* global module */

import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import iconField from './icon_field'

storiesOf('Forms', module)
  .addDecorator(withKnobs)
  .add('Icon field', iconField)
