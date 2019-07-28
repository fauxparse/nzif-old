/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import ErrorMessage from './'

storiesOf('Atoms|ErrorMessage', module)
  .add('Basic', () => <ErrorMessage>Uh-oh, something bad happened.</ErrorMessage>)
