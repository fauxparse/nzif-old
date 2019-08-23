/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { RegistrationProvider, DummyLoader } from 'contexts/registration'
import RegistrationForm from './'

storiesOf('Templates|Registration/Form', module)
  .addParameters({ options: { padding: false } })
  .addDecorator(story => (
    <RegistrationProvider loader={DummyLoader}>
      {story()}
    </RegistrationProvider>
  ))
  .add('Blank', () => (
    <RegistrationForm festival={{ year: 2019 }} />
  ))
