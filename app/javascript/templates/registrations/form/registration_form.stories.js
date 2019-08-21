/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { RegistrationProvider } from 'contexts/registration'
import RegistrationForm from './'

storiesOf('Templates|Registration/Form', module)
  .addParameters({ options: { padding: false } })
  .addDecorator(story => <RegistrationProvider>{story()}</RegistrationProvider>)
  .add('Blank', () => (
    <RegistrationForm festival={{ year: 2019 }} />
  ))
