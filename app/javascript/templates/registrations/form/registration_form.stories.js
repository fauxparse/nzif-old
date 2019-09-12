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
  .add('Earlybird', () => (
    <RegistrationForm festival={{ year: 2019, state: 'earlybird' }} />
  ))
  .add('In between', () => (
    <RegistrationForm festival={{ year: 2019, state: 'allocating' }} />
  ))
  .add('Registration', () => (
    <RegistrationForm festival={{ year: 2019, state: 'registration' }} />
  ))
