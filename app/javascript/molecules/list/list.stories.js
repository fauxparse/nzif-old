/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import Divider from 'atoms/divider'
import Ripple from 'effects/ripple'
import List from './index'

storiesOf('Molecules|List', module)
  .add('Basic', () => (
    <List style={{ maxWidth: '24rem' }}>
      <List.Item icon="user" primary="Profile" />
      <List.Item icon="admin" primary="Settings" secondaryIcon="chevron-right" />
      <Divider />
      <List.Item primary="Text only" />
    </List>
  ))
  .add('Avatar', () => (
    <List style={{ maxWidth: '24rem' }}>
      <List.Item
        primary="Jennifer O’Sullivan"
        secondary="Festival director"
        avatar={{ name: 'Jennifer O’Sullivan' }}
        icon="chevron-right"
      >
        <Ripple />
      </List.Item>
      <Divider inset as="li" />
      <List.Item
        primary="Matt Powell"
        secondary="Registration co-ordinator"
        avatar={{ name: 'Matt Powell' }}
        icon="chevron-right"
      >
        <Ripple />
      </List.Item>
    </List>
  ))
