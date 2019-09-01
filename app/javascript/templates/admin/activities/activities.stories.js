import React from 'react'
import { storiesOf } from '@storybook/react'
import Edit from './edit'

const FESTIVAL = {
  year: new Date().getYear() + 1900,
}

const ACTIVITY = {
  type: 'workshop',
  name: 'Workshop name',
  slug: 'workshop-name',
}

storiesOf('Templates|Admin/Activities', module)
  .addParameters({ options: { padding: false } })
  .add('Edit', () => <Edit festival={FESTIVAL} activity={ACTIVITY} />)
