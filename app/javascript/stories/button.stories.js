/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import Button from '../components/button'
import { icon } from './knobs'

storiesOf('Buttons', module)
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
  .add('Custom', () => (
    <Button disabled={boolean('Disabled', false)} onClick={action('clicked')}>
      <Button.Text>{text('Text', 'Primary Button')}</Button.Text>
      <Button.Icon name={icon()} />
    </Button>
  ))
