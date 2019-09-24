import React, { useCallback, useState } from 'react'
import { storiesOf } from '@storybook/react'
import { boolean } from '@storybook/addon-knobs'
import faker from 'faker'
import sample from 'lodash/sample'
import merge from 'lodash/merge'
import moment from 'lib/moment'
import Edit from './edit'

const FESTIVAL = {
  year: 2019,
  adminRoot: '/admin/2019',
}

const PRESENTERS = new Array(50).fill(0).map(() => ({
  id: faker.random.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
}))

const VENUES = new Array(5).fill(0).map(() => ({
  id: faker.random.uuid(),
  name: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
  address: faker.address.streetAddress(),
  latitude: parseFloat(faker.address.latitude()),
  longitude: parseFloat(faker.address.longitude()),
}))

const ACTIVITY = {
  id: faker.random.uuid(),
  type: 'workshop',
  name: 'Workshop name',
  slug: 'workshop-name',
  description: faker.lorem.paragraph(),
  presenters: PRESENTERS.slice(0, 2),
  sessions: new Array(2).fill(0).map((_, i) => ({
    id: faker.random.uuid(),
    startsAt: moment().startOf('day').add(i, 'days').add(10, 'hours'),
    capacity: 16,
    placements: [],
    waitlist: [],
    venue: sample(VENUES),
  })),
}

const EditDemo = (props) => {
  const [tab, setTab] = useState('details')

  const [activity, setActivity] = useState(ACTIVITY)

  const changed = useCallback(changes => (
    setActivity(merge({}, activity, changes))
  ), [activity, setActivity])

  const sessionChanged = useCallback((session, changes) => {
    const { venueId, ...rest } = changes
    const venue = venueId && VENUES.find(v => v.id === venueId)

    changed({
      sessions: activity.sessions.map(s => (s.id === session.id ? {
        ...s,
        venue,
        ...rest,
      } : s))
    })
  }, [changed, activity])

  return (
    <Edit
      festival={FESTIVAL}
      activity={activity}
      presenters={PRESENTERS}
      venues={VENUES}
      tab={tab}
      onTabChange={setTab}
      onChange={changed}
      onSessionChange={sessionChanged}
      onRollChanged={() => {}}
      {...props}
    />
  )
}

storiesOf('Templates|Admin/Activities', module)
  .addParameters({ options: { padding: false, theme: 'dark' } })
  .add('Edit', () => <EditDemo loading={boolean('Loading', false)} />)
