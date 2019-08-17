/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import Stepper from './'

storiesOf('Molecules|Stepper', module)
  .add('Registration', () => (
    <Stepper>
      <Stepper.Step icon="user" text="Your details" completed />
      <Stepper.Step icon="activities" text="Workshops" current />
      <Stepper.Step icon="calendar" text="Availability" />
      <Stepper.Step icon="payment" text="Payment" />
    </Stepper>
  ))
