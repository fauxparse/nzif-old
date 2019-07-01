/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import Divider from 'atoms/divider'
import Menu from './'

storiesOf('Molecules|Menu', module)
  .add('Country menu', () => (
    <Menu icon="country" text="Country">
      <Menu.Item primary="New Zealand" />
      <Menu.Item primary="Australia" />
      <Divider />
      <Menu.Item primary="USA" />
      <Menu.Item primary="Canada" />
      <Menu.Item primary="Japan" />
    </Menu>
  ))
