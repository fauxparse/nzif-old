import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import Likert from './'

const LikertDemo = () => {
  const [value, setValue] = useState()

  return (
    <Likert
      options={[
        'So, so bad',
        'So, bad',
        'About right',
        'So, good',
        'So, so good',
      ]}
      value={value}
      onChange={setValue}
    />
  )
}

storiesOf('Molecules|Likert', module)
  .add('5-point scale', () => <LikertDemo />)
