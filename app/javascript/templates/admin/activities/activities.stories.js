import React, { useCallback, useState } from 'react'
import { storiesOf } from '@storybook/react'
import { boolean } from '@storybook/addon-knobs'
import faker from 'faker'
import Edit from './edit'

const FESTIVAL = {
  year: new Date().getYear() + 1900,
}

const PRESENTERS = new Array(50).fill(0).map(() => ({
  id: faker.random.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
}))

const ACTIVITY = {
  id: faker.random.uuid(),
  type: 'workshop',
  name: 'Workshop name',
  slug: 'workshop-name',
  presenters: PRESENTERS.slice(0, 2),
}

const EditDemo = (props) => {
  const [tab, setTab] = useState('details')

  const [activity, setActivity] = useState(ACTIVITY)

  const change = useCallback(changes => (
    setActivity({ ...activity, ...changes })
  ), [activity, setActivity])

  return (
    <Edit
      festival={FESTIVAL}
      activity={activity}
      presenters={PRESENTERS}
      tab={tab}
      onTabChange={setTab}
      onChange={change}
      {...props}
    />
  )
}

storiesOf('Templates|Admin/Activities', module)
  .addParameters({ options: { padding: false, theme: 'dark' } })
  .add('Edit', () => <EditDemo loading={boolean('Loading', false)} />)
