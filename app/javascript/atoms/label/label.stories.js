/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean, text } from '@storybook/addon-knobs'
import Label from './'

storiesOf('Atoms|Label', module)
  .add('Basic', () => (
    <Label required={boolean('Required', false)}>
      {text('Label', 'Label text')}
    </Label>
  ))
