/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import AppBar from './'

const user = {
  id: 1,
  name: 'Kiki Hohnen',
}

storiesOf('Organisms|AppBar', module)
  .add('Guest', () => <AppBar />)
  .add('Registered user', () => <AppBar user={user} />)
