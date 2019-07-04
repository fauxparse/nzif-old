/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import Masthead from './'

const festival = {
  startDate: '2019-10-07',
  endDate: '2019-10-19',
}

storiesOf('Atoms|Masthead', module)
  .add('Blank', () => <Masthead />)
  .add('With dates', () => <Masthead festival={festival} />)
