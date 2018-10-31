/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import Button from '../components/buttons'
import { icon } from './knobs'

storiesOf('Buttons', module)
  .addDecorator(withKnobs)
  .add('Normal', () => (
    <Button
      icon={icon('Icon', null)}
      text={text('Text', 'Button')}
      disabled={boolean('Disabled', false)}
      onClick={action('clicked')}
    />
  ))
  .add('Primary', () => (
    <Button
      primary
      icon={icon('Icon', null)}
      text={text('Text', 'Primary Button')}
      disabled={boolean('Disabled', false)}
      onClick={action('clicked')}
    />
  ))
  .add('Icon only', () => (
    <Button
      primary
      icon={icon()}
      disabled={boolean('Disabled', false)}
      onClick={action('clicked')}
    />
  ))
