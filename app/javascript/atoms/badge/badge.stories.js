/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { number } from '@storybook/addon-knobs'
import Badge from './'

storiesOf('Atoms|Badge', module)
  .add('Number', () => <Badge>{number('Number', 1)}</Badge>)
