import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import Switch from './'

const SwitchDemo = (props = {}) => {
  const [checked, setChecked] = useState(false)

  return <Switch checked={checked} onChange={e => setChecked(e.target.checked)} {...props} />
}

storiesOf('Atoms|Switch', module).add('Switch', () => <SwitchDemo />)
