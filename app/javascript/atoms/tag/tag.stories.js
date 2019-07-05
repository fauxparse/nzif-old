/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean, text } from '@storybook/addon-knobs'
import Tag from './'

storiesOf('Atoms|Tag', module)
  .add('Single', () => (
    <Tag selected={boolean('Selected', false)}>
      {text('Tag', 'tagged')}
    </Tag>
  ))
