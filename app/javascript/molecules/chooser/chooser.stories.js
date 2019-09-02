import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Chooser from './'
import COUNTRIES from './countries.json'

const ChooserDemo = (props = {}) => {
  const [selected, setSelected] = useState(COUNTRIES.filter(c => c.id === 'NZ'))

  return (
    <Chooser
      options={COUNTRIES}
      selected={selected}
      placeholder="Select countries…"
      onChange={setSelected}
      onFocus={action('Focus')}
      onBlur={action('Blur')}
      {...props}
    />
  )
}

storiesOf('Molecules|Chooser', module)
.add('Countries', () => <ChooserDemo />)
