import React, { useCallback, useState } from 'react'
import { storiesOf } from '@storybook/react'
import times from 'lodash/times'
import Prices from './'

const fakePrices = times(10, (i) => ({
  activityType: 'Workshop',
  quantity: i + 1,
  amount: 50 * (i + 1) * 100,
}))

const PricesDemo = () => {
  const [prices, setPrices] = useState(fakePrices)

  const updatePrice = useCallback((price) => {
    setPrices(prices.map(p => (p.quantity === price.quantity ? { ...p, ...price } : p)))
  }, [prices, setPrices])

  const addPrice = useCallback((price) => {
    setPrices([...prices, price])
  }, [prices, setPrices])

  const deletePrice = useCallback((price) => {
    setPrices(
      prices
        .filter(p => p.quantity !== price.quantity)
        .map((p, i) => ({ ...p, quantity: i + 1 }))
    )
  }, [prices, setPrices])

  return (
    <Prices
      festival={{ year: 2019, adminRoot: '/admin/2019' }}
      prices={prices}
      onAddPrice={addPrice}
      onUpdatePrice={updatePrice}
      onDeletePrice={deletePrice}
    />
  )
}

storiesOf('Templates|Admin', module)
  .addParameters({ options: { padding: false, theme: 'dark' } })
  .add('Prices', () => <PricesDemo />)