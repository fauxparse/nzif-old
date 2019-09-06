import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import Select from './'

const SelectDemo = () => {
  const [value, setValue] = useState()

  const options = [
    { id: 'red', label: 'Red' },
    { id: 'orange', label: 'Orange' },
    { id: 'yellow', label: 'Yellow' },
    '---',
    { id: 'green', label: 'Green' },
    { id: 'blue', label: 'Blue' },
    { id: 'indigo', label: 'Indigo' },
    { id: 'violet', label: 'Violet' },
  ]

  return (
    <Select
      options={options}
      value={value}
      onChange={setValue}
      placeholder="Choose a colour…"
    />
  )
}

storiesOf('Molecules|Select', module)
  .addParameters({ options: { padding: 32 } })
  .add('Basic', () => <SelectDemo />)
