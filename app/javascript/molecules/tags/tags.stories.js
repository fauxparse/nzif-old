/* global module */

import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import Tags from './'

const TagsDemo = (props) => {
  const tags = ['Tomato', 'Mandarin', 'Grape', 'Plum', 'Mint', 'Apple']

  const [selection, setSelection] = useState([])

  return (
    <Tags
      tags={tags}
      selected={selection}
      onChange={setSelection}
      {...props}
    />
  )
}

storiesOf('Molecules|Tags', module)
  .add('Multiple', () => <TagsDemo />)
  .add('Exclusive', () => <TagsDemo exclusive />)
