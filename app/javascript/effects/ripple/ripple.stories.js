/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean } from '@storybook/addon-knobs'
import Ripple from './index'

storiesOf('Effects', module)
  .add('Ripple', () => (
    <Ripple
      center={boolean('Center', false)}
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
    />
  ))
