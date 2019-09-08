import React, { useMemo, useState } from 'react'
import { storiesOf } from '@storybook/react'
import { boolean } from '@storybook/addon-knobs'
import faker from 'faker'
import entries from 'lodash/entries'
import groupBy from 'lodash/groupBy'
import sampleSize from 'lodash/sampleSize'
import times from 'lodash/times'
import moment from 'lib/moment'
import Allocation from './'

const year = new Date().getYear() + 1900

const DAYS = times(5, i => moment().startOf('day').add(i, 'days'))

const FESTIVAL = {
  year,
  adminRoot: `/admin/${year}`,
}

const SESSIONS = DAYS.reduce((list, day) => [
  ...list,
  ...times(4, () => ({
    id: faker.random.uuid(),
    startsAt: day.clone().hour(10),
    endsAt: day.clone().hour(13),
    capacity: 12,
    activity: {
      id: faker.random.uuid(),
      type: 'workshop',
      name: faker.commerce.productName(),
    },
  })),
], [])

const REGISTRATIONS = times(50, () => ({
  id: faker.random.uuid(),
  user: {
    id: faker.random.uuid(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  },
  preferences:
    entries(
      groupBy(
        sampleSize(SESSIONS, Math.ceil(Math.random() * 15) + 5),
        s => s.startsAt.valueOf()
      )
    )
    .reduce((list, [, sessions]) => [
      ...list,
      ...sessions.map((s, i) => ({ sessionId: s.id, position: i + 1 }))
    ], [])
}))

const AllocationDemo = (props) => {
  const [seed, setSeed] = useState(faker.random.number())

  const shuffle = () => setSeed(faker.random.number())

  const allocations = useMemo(() => {
    const timeslots = entries(groupBy(SESSIONS, s => s.startsAt.valueOf()))
      .map(([, sessions]) => sessions)

    return timeslots.reduce((result, sessions) => ({
      ...result,
      ...sessions.reduce((hash, session) => {
        const allocated =
          REGISTRATIONS
            .filter(r => r.preferences.some(p => p.sessionId === session.id && p.position === 1))
            .map(r => r.id)
        const time = session.startsAt.valueOf()

        return {
          ...hash,
          [session.id]: allocated.slice(0, session.capacity),
          unallocated: {
            ...hash.unallocated,
            [time]: [
              ...(hash.unallocated[time] || []),
              ...allocated.slice(session.capacity),
            ],
          },
        }
      }, result),
    }), { unallocated: {} })
  }, [seed])

  return (
    <Allocation
      festival={FESTIVAL}
      sessions={SESSIONS}
      registrations={REGISTRATIONS}
      allocations={allocations}
      seed={seed}
      onShuffle={shuffle}
      {...props}
    />
  )
}

storiesOf('Templates|Admin/Activities', module)
  .addParameters({ options: { padding: false, theme: 'dark' } })
  .add('Allocation', () => (
    <AllocationDemo loading={boolean('Loading', false)} />
  ))
