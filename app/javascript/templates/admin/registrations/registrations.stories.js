/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean } from '@storybook/addon-knobs'
import faker from 'faker'
import Registrations from './'

const REGISTRATIONS = new Array(100).fill(0).map(() => ({
  id: faker.random.uuid(),
  user: {
    id: faker.random.uuid(),
    name: faker.name.findName(),
  },
}))

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
