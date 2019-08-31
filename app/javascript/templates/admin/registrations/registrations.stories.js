import React, { cloneElement, useState } from 'react'
import { storiesOf } from '@storybook/react'
import { boolean } from '@storybook/addon-knobs'
import moment from 'lib/moment'
import faker from 'faker'
import sampleSize from 'lodash/sampleSize'
import entries from 'lodash/entries'
import groupBy from 'lodash/groupBy'
import Registrations from './'
import Details from './details'
import dummyWorkshops, { dummySession } from 'templates/activities/overview/dummy'

const SESSIONS = dummyWorkshops()

const SHOWS = new Array(5).fill(0).map((_, i) => (
  dummySession(moment().startOf('day').add(i, 'days'), i, 'show')
))

const REGISTRATIONS = new Array(100).fill(0).map((_, index) => {
  const completedAt = (!index || Math.random() < 0.95)
    ? moment().subtract(Math.random() * 10, 'days')
    : undefined

  const name = faker.name.findName()

  const email = faker.internet.email()

  return {
    id: faker.random.uuid(),
    name,
    email,
    user: {
      id: faker.random.uuid(),
      name,
      email,
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

const RegistrationContainer = ({ children }) => {
  const [registration, setRegistration] = useState({
    ...REGISTRATIONS[0],
    preferences: randomPreferences(),
    availability: [],
  })
  const onChange = (changes) => setRegistration({ ...registration, ...changes })
  return cloneElement(children, { registration, onChange })
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
    <RegistrationContainer>
      <Details
        festival={FESTIVAL}
        sessions={SESSIONS}
        allInShows={SHOWS}
        loading={boolean('Loading', false)}
      />
    </RegistrationContainer>
  ))
