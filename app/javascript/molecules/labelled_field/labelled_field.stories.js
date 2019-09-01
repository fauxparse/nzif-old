/* global module */
/* eslint-disable react/prop-types */

import React, { useCallback, useState } from 'react'
import { storiesOf } from '@storybook/react'
import TextField from 'atoms/text_field'
import LabelledField from './'

const TextFieldDemo = ({ value = '', ...props }) => {
  const [current, setCurrent] = useState(value)

  const changed = useCallback((e) => setCurrent(e.target.value), [setCurrent])

  return (
    <TextField
      placeholder="Type something…"
      value={current}
      onChange={changed}
      {...props}
    />
  )
}

storiesOf('Molecules|LabelledField', module)
  .add('Basic', () => (
    <LabelledField
      as={TextFieldDemo}
      name="comments"
      label="Comments"
      required
    />
  ))
  .add('With icon', () => (
    <LabelledField
      as={TextFieldDemo}
      icon="email"
      name="email"
      label="Email"
      type="email"
      required
    />
  ), { options: { padding: '1rem 1rem 1rem 4.5rem' } })
  .add('With errors', () => (
    <LabelledField
      as={TextFieldDemo}
      name="comments"
      label="Comments"
      required
      errors={{ comments: ['Seriously, please type something.'] }}
    />
  ))
