import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean, text } from '@storybook/addon-knobs'
import { Link } from 'react-router-dom'
import Button from './index'
import { icon } from '../../stories/knobs'

storiesOf('Atoms|Button', module)
  .add('Normal', () => (
    <Button
      icon={icon('Icon', null)}
      text={text('Text', 'Button')}
      disabled={boolean('Disabled', false)}
    />
  ))
  .add('Primary', () => (
    <Button
      primary
      icon={icon('Icon', null)}
      text={text('Text', 'Primary Button')}
      disabled={boolean('Disabled', false)}
    />
  ))
  .add('Icon only', () => (
    <Button
      primary
      icon={icon()}
      disabled={boolean('Disabled', false)}
    />
  ))
  .add('Link', () => (
    <Button
      as={Link}
      to="/"
      icon={icon('Icon', 'edit')}
      text={text('Text', 'Edit')}
      disabled={boolean('Disabled', false)}
    />
  ))
  .add('Custom', () => (
    <Button disabled={boolean('Disabled', false)}>
      <Button.Text>{text('Text', 'Primary Button')}</Button.Text>
      <Button.Icon name={icon()} />
    </Button>
  ))
