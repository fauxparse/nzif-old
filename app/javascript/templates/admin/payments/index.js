import React, { useCallback, useMemo, useState } from 'react'
import PropTypes from 'lib/proptypes'
import deburr from 'lodash/deburr'
import keyBy from 'lodash/keyBy'
import snakeCase from 'lodash/snakeCase'
import sortBy from 'lodash/sortBy'
import MiniSearch from 'minisearch'
import number from 'lib/number'
import Loader from 'atoms/loader'
import Breadcrumbs from 'molecules/breadcrumbs'
import List from 'molecules/list'
import Search from 'molecules/search'
import Tags from 'molecules/tags'
import Header from 'organisms/header'
import Payment from './payment'
import PaymentDetails from './payment_details'

import './index.scss'

const Payments = ({ festival, loading, payments, onAddPayment, onUpdatePayment }) => {
  const [states, setStates] = useState(['Pending', 'Approved'])

  const [types, setTypes] = useState(['Internet banking', 'Credit card', 'Voucher'])

  const [search, setSearch] = useState('')

  const byId = useMemo(() => keyBy(payments, p => p.id), [payments])

  const filtered = useMemo(() => {
    const stateSet = new Set(states.map(snakeCase))
    const typeSet = new Set(types.map(snakeCase))
    return payments.filter(p => stateSet.has(p.state) && typeSet.has(p.type))
  }, [payments, states, types])

  const searcher = useMemo(() => {
    const miniSearch = new MiniSearch({
      fields: ['name'],
      extractField: (payment, field) => deburr(payment.registration.user[field]),
      searchOptions: {
        tokenize: string => deburr(string).toLowerCase().split(/[^a-zA-Z0-9\u00C0-\u017F]+/),
        processTerm: deburr,
        prefix: true,
        fuzzy: 0.25,
      },
    })
    miniSearch.addAll(filtered)
    return miniSearch
  }, [filtered])

  const sorted = useMemo(() => (
    sortBy(
      search ? searcher.search(search).map(({ id }) => byId[id]) : [...filtered],
      [p => p.createdAt]
    ).reverse()
  ), [searcher, search, filtered, byId])

  const totalAmount = useMemo(() => (
    number(sorted.reduce((total, p) => total + p.amount, 0) / 100.0, '$0,0.00')
  ), [sorted])

  const [payment, setPayment] = useState()

  const detailsClosed = useCallback(() => setPayment(undefined), [setPayment])

  return (
    <section className="payments-admin">
      <Header>
        {festival && (
          <Breadcrumbs back={festival.adminRoot}>
            <Breadcrumbs.Link to={festival.adminRoot}>Dashboard</Breadcrumbs.Link>
          </Breadcrumbs>
        )}
        <Header.Title>Payments</Header.Title>
        <Tags
          tags={['Approved', 'Pending', 'Cancelled']}
          selected={states}
          onChange={setStates}
        />
        <Tags
          tags={['Internet banking', 'Credit card', 'Voucher']}
          selected={types}
          onChange={setTypes}
        />
        <Search
          className="payments__search"
          value={search}
          onChange={setSearch}
          autoFocus
          placeholder={
            loading
              ? 'Loading…'
              : `Search ${filtered.length} payments (${totalAmount})`
          }
          disabled={loading || undefined}
        />
      </Header>
      <div className="payments-admin__body">
        {loading ? <Loader /> : (
          <List className="payments">
            {sorted.map(payment => (
              <Payment
                key={payment.id}
                payment={payment}
                onClick={setPayment}
              />
            ))}
          </List>
        )}
      </div>
      <PaymentDetails
        payment={payment}
        onAddPayment={onAddPayment}
        onUpdatePayment={onUpdatePayment}
        onClose={detailsClosed}
      />
    </section>
  )
}

Payments.propTypes = {
  festival: PropTypes.festival,
  loading: PropTypes.bool,
  payments: PropTypes.arrayOf(PropTypes.payment.isRequired),
  onAddPayment: PropTypes.func.isRequired,
  onUpdatePayment: PropTypes.func.isRequired,
}

Payments.defaultProps = {
  festival: null,
  loading: false,
  payments: [],
}

export default Payments