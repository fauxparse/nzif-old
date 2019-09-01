import React from 'react'
import { storiesOf } from '@storybook/react'
import Details from './'

storiesOf('Templates|Activities/Details', module)
  .addParameters({ options: { padding: false } })
  .add('Loading', () => (
    <Details
      loading
      type="workshop"
      festival={{
        year: 2019,
      }}
    />
  ))
