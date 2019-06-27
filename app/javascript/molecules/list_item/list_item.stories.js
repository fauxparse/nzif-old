/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import ListItem from './index'

import small from 'atoms/avatar/avatar_small.jpg'
import medium from 'atoms/avatar/avatar_medium.jpg'

storiesOf('Molecules|ListItem', module)
  .add('Basic', () => (
    <ul className="list" style={{ maxWidth: '24rem' }}>
      <ListItem icon="user" primary="Profile" />
      <ListItem icon="admin" primary="Settings" secondaryIcon="chevron-right" />
      <ListItem primary="Text only" />
    </ul>
  ))
  .add('Avatar', () => (
    <ul className="list" style={{ maxWidth: '24rem' }}>
      <ListItem
        primary="Matt Powell"
        secondary="Registration co-ordinator"
        avatar={{
          name: 'Matt Powell',
          image: { small, medium },
        }}
        icon="chevron-right"
      />
    </ul>
  ))
