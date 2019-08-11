/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import Overview from './'

storiesOf('Templates|Activities/Overview', module)
  .add('Loading', () => <Overview loading />)
