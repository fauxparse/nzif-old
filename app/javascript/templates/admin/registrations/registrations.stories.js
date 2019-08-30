/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean } from '@storybook/addon-knobs'
import moment from 'lib/moment'
import faker from 'faker'
import sampleSize from 'lodash/sampleSize'
import entries from 'lodash/entries'
import groupBy from 'lodash/groupBy'
import Registrations from './'
import Details from './details'
import dummyWorkshops from 'templates/activities/overview/dummy'

const SESSIONS = dummyWorkshops()

const REGISTRATIONS = new Array(100).fill(0).map((_, index) => {
  const completedAt = (!index || Math.random() < 0.95)
    ? moment().subtract(Math.random() * 10, 'days')
    : undefined

  return {
    id: faker.random.uuid(),
    user: {
      id: faker.random.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email(),
    },
    state: completedAt ? 'complete' : 'pending',
    completedAt,
  }
})

const randomPreferences = () =>
  entries(
    groupBy(sampleSize(SESSIONS, Math.floor(Math.random() * 10) + 5), s => s.startsAt.valueOf())
  ).reduce((list, [_, sessions]) => [
    ...list,
    ...sessions.map((s, i) => ({ sessionId: s.id, position: i + 1 })),
  ], [])

const FESTIVAL = {
  year: new Date().getYear() + 1900,
}

storiesOf('Templates|Admin/Registrations', module)
  .add('List', () => (
    <Registrations
      festival={FESTIVAL}
      registrations={REGISTRATIONS}
      loading={boolean('Loading', false)}
    />
  ))
  .add('Details', () => (
    <Details
      festival={FESTIVAL}
      sessions={SESSIONS}
      registration={{ ...REGISTRATIONS[0], preferences: randomPreferences() }}
      loading={boolean('Loading', false)}
    />
  ))
