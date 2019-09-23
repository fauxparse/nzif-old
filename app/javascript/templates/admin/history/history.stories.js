import React from 'react'
import { storiesOf } from '@storybook/react'
import faker from 'faker'
import sample from 'lodash/sample'
import times from 'lodash/times'
import moment from 'lib/moment'
import History from './'

const fakeItems = () => times(50, (i) => ({
  icon: sample(['add', 'close', 'join-waitlist', 'leave-waitlist', 'join-from-waitlist']),
  description: faker.lorem.sentence(),
  timestamp: moment().subtract(i * 73, 'seconds'),
}))

storiesOf('Templates|Admin', module)
  .add('History', () => <History items={fakeItems()} />)