/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { select, text } from '@storybook/addon-knobs'
import moment from 'lib/moment'
import Date, { DATE_FORMATS } from './index'

storiesOf('Atoms|Date', module)
  .add('Default', () => (
    <Date
      date={moment()}
      format={select('Format', Object.keys(DATE_FORMATS), 'default')}
    />
  ))
  .add('Custom', () => (
    <Date
      date={moment()}
      format={text('Format', 'dddd D MMMM, YYYY')}
    />
  ))
  .add('Range', () => (
    <Date
      date={[
        moment().subtract(1, 'week'),
        moment(),
      ]}
    />
  ))
