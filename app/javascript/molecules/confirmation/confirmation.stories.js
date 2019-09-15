import React, { useCallback } from 'react'
import { storiesOf } from '@storybook/react'
import { useConfirmation } from './'
import Button from 'atoms/button'

const ConfirmationDemo = () => {
  const { confirm } = useConfirmation()

  const showMessage = useCallback(() => {
    confirm('demo', {
      message: 'Some important message',
      title: 'Custom title',
      confirm: 'Alright',
      cancel: 'Not really',
    }).then(() => {}).catch(() => {})
  }, [confirm])

  return (
    <Button text="Danger!" icon="alert" onClick={showMessage} />
  )
}

storiesOf('Molecules|Confirmation', module)
  .add('Dialog', () => <ConfirmationDemo />)
