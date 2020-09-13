import React, { useCallback } from 'react'
import PropTypes from 'lib/proptypes'
import Header from 'organisms/header'
import Breadcrumbs from 'molecules/breadcrumbs'
import Button from 'atoms/button'
import PriceRow from './row'

import './index.scss'

const Prices = ({ festival, prices, onAddPrice, onUpdatePrice, onDeletePrice }) => {
  const addPriceClicked = useCallback(() => {
    const quantity = prices.length + 1
    const amount = (quantity > 2)
      ? prices[quantity - 2].amount + prices[quantity - 2].amount - prices[quantity - 3].amount
      : 0
    onAddPrice({ quantity, amount })
  }, [prices, onAddPrice])

  return (
    <section className="prices-admin">
      <Header>
        {festival && (
          <Breadcrumbs back={festival.adminRoot}>
            <Breadcrumbs.Link to={festival.adminRoot}>Dashboard</Breadcrumbs.Link>
          </Breadcrumbs>
        )}
        <Header.Title>Workshop prices</Header.Title>
      </Header>
      <div className="prices-admin__body">
        <table className="prices">
          <tbody>
            {prices.map((price) => (
              <PriceRow
                key={price.quantity}
                price={price}
                onChange={onUpdatePrice}
                onDelete={onDeletePrice}
              />
            ))}
          </tbody>
        </table>
        <Button primary icon="add" text="Add price" onClick={addPriceClicked} />
      </div>
    </section>
  )
}

Prices.propTypes = {
  festival: PropTypes.festival,
  loading: PropTypes.bool,
  prices: PropTypes.arrayOf(PropTypes.price.isRequired),
  onAddPrice: PropTypes.func.isRequired,
  onDeletePrice: PropTypes.func.isRequired,
  onUpdatePrice: PropTypes.func.isRequired,
}

Prices.defaultProps = {
  festival: null,
  loading: false,
  prices: [],
}

export default Prices
