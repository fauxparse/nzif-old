import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import faker from 'faker'
import Button from 'atoms/button'
import Toast, { notify } from './'

storiesOf('Molecules|Toast', module)
  .add('Component', () => (
    <Toast
      icon="info"
      onClose={action('close')}
    >
      {faker.lorem.sentence()}
    </Toast>
  ))
  .add('Default notification', () => (
    <Button
      text="Notify"
      onClick={() => (
        notify(faker.lorem.sentence(), { position: 'bottom-right' })
      )}
    />
  ))
