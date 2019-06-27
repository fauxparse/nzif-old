/* global module */

import React, { useMemo } from 'react'
import { storiesOf } from '@storybook/react'
import moment from 'lib/moment'
import { useClock } from 'lib/hooks'
import Counter from './'

const LABELS = ['hour', 'minute', 'second']

const CounterDemo = () => {
  const time = useClock()

  const groups = useMemo(() => moment(time).format('hh:mm:ss').split(':'), [time])

  return (
    <Counter style={{ fontSize: '4rem' }}>
      {groups.map((digits, i) => (
        <>
          {i > 0 && <Counter.Text>:</Counter.Text>}
          <Counter.Group key={i} digits={digits} pad={2} label={LABELS[i]} />
        </>
      ))}
    </Counter>
  )
}

storiesOf('Molecules|Counter', module)
  .add('Time', () => <CounterDemo />)
