/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import moment from 'lib/moment'
import Home from './'

const FESTIVAL = {
  year: 2019,
  startDate: '2019-10-08',
  endDate: '2019-10-17',
}

storiesOf('Templates|Home', module)
  .addParameters({ options: { padding: false } })
  .add('Loading', () => <Home loading />)
  .add('Pitches open', () => (
    <Home
      festival={{
        ...FESTIVAL,
        state: 'pitching',
        deadline: moment().add(1, 'week'),
      }}
    />
  ))
  .add('Pitches closed', () => (
    <Home
      festival={{
        ...FESTIVAL,
        state: 'programming',
      }}
    />
  ))
  .add('Registrations open', () => (
    <Home
      festival={{
        ...FESTIVAL,
        state: 'earlybird',
        deadline: moment().add(1, 'week'),
      }}
    />
  ))
