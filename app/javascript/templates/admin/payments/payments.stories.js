import React, { useCallback, useState } from 'react'
import { storiesOf } from '@storybook/react'
import sample from 'lodash/sample'
import times from 'lodash/times'
import faker from 'faker'
import moment from 'lib/moment'
import Payments from './'

const fakePayments = times(100, () => ({
  id: faker.random.uuid(),
  type: sample(['internet_banking', 'credit_card']),
  amount: 50 * Math.ceil(Math.random() * 12) * 100,
  state: sample(['approved', 'cancelled', 'pending']),
  createdAt: moment().subtract(Math.floor(Math.random() * 20000), 'minutes'),
  registration: {
    id: faker.random.uuid(),
    user: {
      id: faker.random.uuid(),
      name: faker.name.findName(),
    },
  },
}))

const PaymentsDemo = () => {
  const [payments, setPayments] = useState(fakePayments)

  const updatePayment = useCallback((payment) => {
    setPayments(payments.map(p => (p.id === payment.id ? { ...p, ...payment } : p)))
  }, [payments, setPayments])

  const addPayment = useCallback((payment) => {
    setPayments([...payments, payment])
  }, [payments, setPayments])

  return (
    <Payments
      festival={{ year: 2019, adminRoot: '/admin/2019' }}
      payments={payments} 
      onAddPayment={addPayment}
      onUpdatePayment={updatePayment}
    />
  )
}

storiesOf('Templates|Admin', module)
  .addParameters({ options: { padding: false, theme: 'dark' } })
  .add('Payments', () => <PaymentsDemo />)