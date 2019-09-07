import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import NumberField from './'

const NumberFieldDemo = (props) => {
  const [value, setValue] = useState(0)

  return (
    <NumberField
      value={value}
      onChange={setValue}
      {...props}
    />
  )
}

storiesOf('Molecules|NumberField', module)
  .add('Basic', () => <NumberFieldDemo min={0} max={100} />)
