import React, { useCallback, useState } from 'react'
import { storiesOf } from '@storybook/react'
import RepeatingButton from './'

const RepeatingButtonDemo = () => {
  const [value, setValue] = useState(0)

  const increment = useCallback(() => setValue(value + 1), [value, setValue])

  return (
    <>
      <h1>{value}</h1>
      <RepeatingButton
        icon="add"
        text="Increment"
        onClick={increment}
      />
    </>
  )
}

storiesOf('Molecules|RepeatingButton', module)
  .add('Increment', () => <RepeatingButtonDemo />)
