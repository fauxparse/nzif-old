/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { radios } from '@storybook/addon-knobs'
import Duotone, { GRADIENTS } from './'

const MONKEY = 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=755&q=80'

storiesOf('Effects|Duotone', module)
  .add('Image', () => (
    <Duotone gradient={radios('Gradient', Object.keys(GRADIENTS), 'tomato')}>
      <img src={MONKEY} style={{ width: '100%', height: 'auto' }} />
    </Duotone>
  ))
