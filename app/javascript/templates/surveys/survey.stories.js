import React from 'react'
import { storiesOf } from '@storybook/react'
import moment from 'lib/moment'
import faker from 'faker'
import Survey from './survey'

const SESSION = {
  id: faker.random.uuid(),
  startsAt: moment('2019-10-12 14:00:00'),
  endsAt: moment('2019-10-12 14:00:00'),
  activity: {
    id: faker.random.uuid(),
    type: 'workshop',
    name: 'People Like You',
    presenters: [{
      id: faker.random.uuid(),
      name: 'Jason Geary',
    }],
    description: faker.lorem.paragraph(),
    levels: ['intermediate', 'advanced'],
  }
}

storiesOf('Templates|Surveys', module)
  .addParameters({ options: { padding: false } })
  .add('Survey', () => <Survey session={SESSION} />)
  .add('Loading', () => <Survey loading />)
  .add('Sending', () => <Survey session={SESSION} sending />)
  .add('Sent', () => <Survey session={SESSION} sent />)