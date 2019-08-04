/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import Checkbox from './'

storiesOf('Atoms|Checkbox', module)
  .add('Basic', () => <Checkbox />)
  .add('Labelled', () => <Checkbox>I agree to the Code of Conduct</Checkbox>)
