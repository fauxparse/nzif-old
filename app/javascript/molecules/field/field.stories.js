/* global module */
/* eslint-disable react/prop-types */

import React, { useCallback, useState } from 'react'
import { storiesOf } from '@storybook/react'
import TextField from 'atoms/text_field'
import Label from 'atoms/label'
import Field from './'

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

storiesOf('Molecules|Field', module)
  .add('Basic', () => (
    <Field>
      <Label htmlFor="comments">Comments</Label>
      <TextFieldDemo id="comments" />
    </Field>
  ))
  .add('With errors', () => (
    <Field>
      <Label htmlFor="comments">Comments</Label>
      <TextFieldDemo id="comments" />
    </Field>
  ))
