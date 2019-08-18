/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import NotFound from './'

storiesOf('Templates|NotFound', module)
  .add('404', () => <NotFound />)
