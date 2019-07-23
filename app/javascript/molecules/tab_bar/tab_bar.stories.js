/* global module */

import React, { useCallback, useState } from 'react'
import { storiesOf } from '@storybook/react'
import Tab from 'atoms/tab'
import TabBar from './'

const TabBarDemo = () => {
  const TABS = ['Tomato', 'Mandarin', 'Peach', 'Plum', 'Mint', 'Apple']

  const [current, setCurrent] = useState(TABS[0])

  const tabClicked = useCallback(e => {
    setCurrent(e.target.closest('.tab').dataset.tab)
  }, [setCurrent])

  return (
    <TabBar>
      {TABS.map(tab => (
        <Tab
          key={tab}
          text={tab}
          selected={tab === current}
          data-tab={tab}
          onClick={tabClicked}
        />
      ))}
    </TabBar>
  )
}

storiesOf('Molecules|TabBar', module)
  .add('Basic', () => <TabBarDemo />)
