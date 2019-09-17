import React from 'react'
import { storiesOf } from '@storybook/react'
import { RegistrationProvider, DummyLoader } from 'contexts/registration'
import RegistrationForm from './'

storiesOf('Templates|Registration', module)
  .addParameters({ options: { padding: false } })
  .addDecorator((story, { parameters }) => (
    <RegistrationProvider loader={DummyLoader} festival={parameters.festival}>
      {story()}
    </RegistrationProvider>
  ))
  .add('Earlybird', ({ parameters }) => (
    <RegistrationForm festival={parameters.festival} />
  ), { festival: { year: 2019, state: 'earlybird' } })
  .add('In between', ({ parameters }) => (
    <RegistrationForm festival={parameters.festival} />
  ), { festival: { year: 2019, state: 'allocating' } })
  .add('Registration', ({ parameters }) => (
    <RegistrationForm festival={parameters.festival} />
  ), { festival: { year: 2019, state: 'registration' } })
  .add('Redirecting', ({ parameters }) => (
    <RegistrationForm festival={parameters.festival} redirecting />
  ), { festival: { year: 2019, state: 'registration' } })
