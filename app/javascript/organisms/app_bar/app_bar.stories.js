/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Menu from 'molecules/menu'
import AppBar from './'

const user = {
  id: 1,
  name: 'Kiki Hohnen',
}

storiesOf('Organisms|AppBar', module)
  .add('Guest', () => (
    <AppBar>
      <AppBar.UserMenu onLoginClick={action('Log in')} />
    </AppBar>
  ))
  .add('Registered user', () => (
    <AppBar user={user}>
      <AppBar.UserMenu onLoginClick={action('Log in')}>
        <Menu.Item icon="user" primary="Hello" />
      </AppBar.UserMenu>
    </AppBar>
  ))
