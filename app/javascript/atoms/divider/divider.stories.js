/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import Divider from './'

storiesOf('Atoms|Divider', module)
  .add('Basic', () => <Divider />)
  .add('Inset', () => <Divider inset />)
  .add('Middle', () => <Divider middle />)
  .add('Accent', () => <Divider accent />)
