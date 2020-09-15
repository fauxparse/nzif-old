import React, { useCallback } from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import { useQuery, useMutation } from 'react-apollo'
import { useFestival } from 'contexts/festival'
import Loader from 'atoms/loader'
import Template from 'templates/admin/prices'
import PRICES from 'queries/prices'
import UPDATE_PRICES from 'queries/mutations/update_prices'

const Prices = ({ match }) => {
  const { year } = match.params

  const festival = useFestival()

  const { loading, data } = useQuery(PRICES, { variables: { year } })

  const { festival: { prices = [] } = {} } = data || {}

  const [updatePrices] = useMutation(UPDATE_PRICES, {
    update: (client, { data: { updatePrices } }) => {
      const existing = client.readQuery({ query: PRICES, variables: { year } })
      client.writeQuery({
        query: PRICES,
        variables: { year },
        data: {
          ...existing,
          festival: {
            ...existing.festival,
            prices: updatePrices
          },
        },
      })
    },
  })

  const update = useCallback((newPrices) => {
    updatePrices({
      variables: { year, prices: newPrices.map(p => p.amount) },
      optimisticResponse: { updatePrices: newPrices.map(p => ({ ...p, __typename: 'Price' })) },
    })
  }, [year, updatePrices])

  const addPrice = useCallback((price) => {
    update([...prices, price])
  }, [prices, update])

  const updatePrice = useCallback((price) => {
    const newPrices = prices.slice(0)
    newPrices.splice(price.quantity - 1, 1, price)
    update(newPrices)
  }, [prices, update])

  const deletePrice = useCallback((price) => {
    const newPrices = prices.slice(0)
    newPrices.splice(price.quantity - 1, 1)
    update(newPrices)
  }, [prices, update])

  if (!festival) return <Loader />

  return (
    <Template
      festival={festival}
      loading={loading}
      prices={prices}
      onAddPrice={addPrice}
      onUpdatePrice={updatePrice}
      onDeletePrice={deletePrice}
    />
  )
}

Prices.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
}

export default Prices