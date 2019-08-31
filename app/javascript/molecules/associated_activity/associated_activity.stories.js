import React from 'react'
import { storiesOf } from '@storybook/react'
import AssociatedActivity from './'

storiesOf('Molecules|Associated Activity', module)
  .add('Workshop', () => (
    <AssociatedActivity
      activity={{
        id: 1,
        type: 'workshop',
        name: 'Casting Workshop',
      }}
    />
  ))
  .add('Show', () => (
    <AssociatedActivity
      activity={{
        id: 1,
        type: 'show',
        name: 'Ensemble Show',
      }}
    />
  ))
