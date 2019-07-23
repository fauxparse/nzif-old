/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean } from '@storybook/addon-knobs'
import Tab from './'

storiesOf('Atoms|Tab', module)
  .add('Basic', () => (
    <Tab
      selected={boolean('Selected', false)}
      disabled={boolean('Disabled', false)}
      to="/"
      text="Tab title"
    />
  ))
