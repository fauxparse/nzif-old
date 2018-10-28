import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Button, { ButtonText } from '../components/button'

storiesOf('Button', module)
  .add('normal', () => (
    <Button onClick={action('clicked')}>
      <ButtonText>Button</ButtonText>
    </Button>
  ))
  .add('primary', () => (
    <Button primary onClick={action('clicked')}>
      <ButtonText>Primary button</ButtonText>
    </Button>
  ))
