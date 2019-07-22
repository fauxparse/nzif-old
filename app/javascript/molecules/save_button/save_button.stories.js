/* global module */

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { storiesOf } from '@storybook/react'
import { text } from '@storybook/addon-knobs'
import SaveButton from './index'

const SaveButtonDemo = (props) => {
  const [saving, setSaving] = useState(false)
  const timeout = useRef()
  const clicked = useCallback(() => {
    setSaving(true)
    timeout.current = setTimeout(() => setSaving(false), 3000)
  }, [setSaving, timeout])

  useEffect(() => () => clearTimeout(timeout.current), [])

  return (
    <SaveButton
      saving={saving}
      onClick={clicked}
      {...props}
    />
  )
}

storiesOf('Molecules|SaveButton', module)
  .add('Normal', () => (
    <SaveButtonDemo
      text={text('Text', 'Save')}
      savingText={text('Saving text', 'Saving…')}
    />
  ))
