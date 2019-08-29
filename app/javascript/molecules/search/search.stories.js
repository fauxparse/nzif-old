import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import Search from './'

const SearchDemo = (props) => {
  const [value, setValue] = useState('')
  return <Search value={value} onChange={setValue} {...props} />
}

storiesOf('Molecules|Search', module)
  .add('Basic', () => <SearchDemo />)
