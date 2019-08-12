/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import moment from 'lib/moment'
import ActivitySession from './'

storiesOf('Molecules|ActivitySession', module)
  .add('Single', () => (
    <ActivitySession
      startsAt={moment().startOf('day').hour(10)}
      endsAt={moment().startOf('day').hour(13)}
    />
  ))
  .add('Multiple', () => (
    <div className="activity-sessions">
      <ActivitySession
        startsAt={moment().startOf('day').hour(10)}
        endsAt={moment().startOf('day').hour(13)}
      />
      <ActivitySession
        startsAt={moment().startOf('day').hour(10)}
        endsAt={moment().startOf('day').hour(13)}
      />
      <ActivitySession
        startsAt={moment().startOf('day').hour(10)}
        endsAt={moment().startOf('day').hour(13)}
      />
    </div>
  ))
