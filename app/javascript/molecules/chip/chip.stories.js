/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Chip from './'

const user = {
  id: 1,
  name: 'Kiki Hohnen',
}

storiesOf('Molecules|Chip', module)
  .add('Default', () => <Chip user={user} />)
  .add('Deletable', () => <Chip user={user} onDelete={action('Delete')} />)
  .add('Small', () => <Chip small user={user} />)
  .add('Small and deletable', () => <Chip small user={user} onDelete={action('Delete')} />)
