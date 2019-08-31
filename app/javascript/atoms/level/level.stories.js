/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { radios } from '@storybook/addon-knobs'
import Level, { LEVELS } from './'

storiesOf('Atoms|Level', module)
  .add('Basic', () => (
    <div style={{ display: 'flex' }}>
      <Level level={radios('Level', Object.keys(LEVELS), Object.keys(LEVELS)[0])} />
    </div>
  ))
  .add('Tiny', () => (
    <div style={{ display: 'flex' }}>
      <Level tiny level={radios('Level', Object.keys(LEVELS), Object.keys(LEVELS)[0])} />
    </div>
  ))
