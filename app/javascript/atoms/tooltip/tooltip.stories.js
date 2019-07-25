/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import Tooltip from './'

storiesOf('Atoms|Tooltip', module)
  .add('Basic', () => (
    <div style={{ display: 'flex' }}>
      <Tooltip title="Secret message">
        <span>Hover over me</span>
      </Tooltip>
    </div>
  ))
