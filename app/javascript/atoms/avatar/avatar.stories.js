/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { text } from '@storybook/addon-knobs'
import Icon from 'atoms/icon'
import Avatar from './index'

import small from './avatar_small.jpg'
import medium from './avatar_medium.jpg'

storiesOf('Atoms|Avatar', module)
  .add('Text', () => (
    <Avatar name={unescape(text('Name', 'Kiki Hohnen'))}/>
  ))
  .add('Icon', () => (
    <Avatar name={unescape(text('Name', 'Kiki Hohnen'))}>
      <Icon name="user" />
    </Avatar>
  ))
  .add('Image', () => (
    <Avatar name={unescape(text('Name', 'Kiki Hohnen'))} image={{ small, medium }} />
  ))
