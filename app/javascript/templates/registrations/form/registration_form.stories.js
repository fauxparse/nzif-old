/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import RegistrationForm from './'

storiesOf('Templates|Registration/Form', module)
  .addParameters({ options: { padding: false } })
  .add('Blank', () => (
    <RegistrationForm festival={{ year: 2019 }} />
  ))
