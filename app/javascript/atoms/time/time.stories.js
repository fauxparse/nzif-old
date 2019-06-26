/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { select, text } from '@storybook/addon-knobs'
import moment from 'lib/moment'
import Time, { TIME_FORMATS } from './index'

storiesOf('Atoms|Time', module)
  .add('Default', () => (
    <Time
      time={moment()}
      format={select('Format', Object.keys(TIME_FORMATS), 'default')}
    />
  ))
  .add('Custom', () => (
    <Time
      time={moment()}
      format={text('Format', 'hh:mm:ss')}
    />
  ))
  .add('Range', () => (
    <Time
      time={[
        moment().startOf('day').add(13, 'hours'),
        moment().startOf('day').add(16, 'hours'),
      ]}
    />
  ))
