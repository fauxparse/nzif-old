/* global module */

import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import Button from '../components/button'
import UploadButton from '../components/admin/activities/upload_button'
import { icon } from './knobs'

class UploadButtonDemo extends Component {
  state = {
    state: 'ready',
    file: undefined,
    progress: 0,
  }

  clicked = () => {
    if (this.state.state === 'finished') {
      this.setState({
        state: 'ready',
        file: undefined,
        progress: 0,
      })
    } else {
      this.setState({ state: 'uploading' })
      this.tick()
    }
  }

  tick = () => {
    let { progress } = this.state
    progress = Math.min(100, progress + Math.random() * 10);
    this.setState({ progress })
    if (progress < 100) {
      setTimeout(this.tick, Math.random() * 100 + 50)
    } else {
      this.setState({
        state: 'finished',
        file: {
          name: 'image1.jpg',
        },
      })
    }
  }

  render() {
    return <UploadButton {...this.state} onClick={this.clicked} />
  }
}

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
  .add('Custom', () => (
    <Button disabled={boolean('Disabled', false)} onClick={action('clicked')}>
      <Button.Text>{text('Text', 'Primary Button')}</Button.Text>
      <Button.Icon name={icon()} />
    </Button>
  ))
  .add('Upload', () => (
    <UploadButtonDemo />
  ))
