/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { text } from '@storybook/addon-knobs'
import Presenter from './'

storiesOf('Atoms|Presenter', module)
  .add('Basic', () => (
    <Presenter
      name={text('Name', 'Kiki Hohnen')}
      origin={text('Origin', 'Netherlands')}
    />
  ))
