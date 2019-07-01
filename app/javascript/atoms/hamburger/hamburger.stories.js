/* global module */

import React, { useCallback, useState } from 'react'
import { storiesOf } from '@storybook/react'
import Hamburger from './'

const HamburgerDemo = () => {
  const [open, setOpen] = useState(false)

  const toggle = useCallback(() => setOpen(!open), [open, setOpen])

  return <Hamburger open={open} onClick={toggle} />
}

storiesOf('Atoms|Hamburger', module)
  .add('Basic', () => <HamburgerDemo />)
