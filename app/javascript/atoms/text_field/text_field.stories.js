/* global module */
/* eslint-disable react/prop-types */

import React, { useCallback, useState } from 'react'
import { storiesOf } from '@storybook/react'
import TextField from './'

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

storiesOf('Atoms|TextField', module)
  .add('Single line', () => <TextFieldDemo />)
  .add('Single line autosize', () => <TextFieldDemo autosize />)
  .add('Multiline', () => <TextFieldDemo multiline rows="5" />)
  .add('Multiline autosize', () => <TextFieldDemo multiline autosize rows={1} />)
