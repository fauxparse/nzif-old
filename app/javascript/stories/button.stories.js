/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import Button, { ButtonText } from '../components/button'

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add('Normal', () => (
    <Button disabled={boolean('Disabled', false)} onClick={action('clicked')}>
      <ButtonText>{text('Text', 'Button')}</ButtonText>
    </Button>
  ))
  .add('Primary', () => (
    <Button primary disabled={boolean('Disabled', false)} onClick={action('clicked')}>
      <ButtonText>{text('Text', 'Primary Button')}</ButtonText>
    </Button>
  ))
