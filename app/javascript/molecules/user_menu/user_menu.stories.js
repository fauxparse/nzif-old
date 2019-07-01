/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import UserMenu from './'

const user = {
  id: 1,
  name: 'Kiki Hohnen',
}

storiesOf('Molecules|UserMenu', module)
  .add('Logged out', () => <UserMenu onLoginClick={action('onLoginClick')} />)
  .add('Logged in', () => <UserMenu user={user} onLoginClick={action('onLoginClick')} />)
