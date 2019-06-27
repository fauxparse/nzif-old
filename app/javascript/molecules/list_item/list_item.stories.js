/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import Divider from 'atoms/divider'
import ListItem from './index'

storiesOf('Molecules|ListItem', module)
  .add('Basic', () => (
    <ul className="list" style={{ maxWidth: '24rem' }}>
      <ListItem icon="user" primary="Profile" />
      <ListItem icon="admin" primary="Settings" secondaryIcon="chevron-right" />
      <Divider />
      <ListItem primary="Text only" />
    </ul>
  ))
  .add('Avatar', () => (
    <ul className="list" style={{ maxWidth: '24rem' }}>
      <ListItem
        primary="Jennifer O’Sullivan"
        secondary="Festival director"
        avatar={{ name: 'Jennifer O’Sullivan' }}
        icon="chevron-right"
      />
      <Divider inset as="li" />
      <ListItem
        primary="Matt Powell"
        secondary="Registration co-ordinator"
        avatar={{ name: 'Matt Powell' }}
        icon="chevron-right"
      />
    </ul>
  ))
