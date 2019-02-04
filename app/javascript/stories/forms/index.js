/* global module */

import { storiesOf } from '@storybook/react'
import iconField from './icon_field'
import select from './select'

storiesOf('Forms', module)
  .add('Icon field', iconField)
  .add('Select', select)
