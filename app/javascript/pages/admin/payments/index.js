import React, { useCallback } from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import { useQuery, useMutation } from 'react-apollo'
import pick from 'lodash/pick'
import { useFestival } from 'contexts/festival'
import Loader from 'atoms/loader'
import Template from 'templates/admin/payments'
import PAYMENTS from 'queries/payments'
import UPDATE_PAYMENT from 'queries/mutations/update_payment'

const Payments = ({ match }) => {
  const { year } = match.params

  const festival = useFestival()

  const { loading, data: { payments = [] } } = useQuery(PAYMENTS, { variables: { year } })

  const [updatePayment] = useMutation(UPDATE_PAYMENT, {
    update: (client, { data: { updatePayment } }) => {
      const existing = client.readQuery({ query: PAYMENTS, variables: { year } })
      client.writeQuery({
        query: PAYMENTS,
        variables: { year },
        data: {
          payments: existing.payments.map(p => (p.id === updatePayment.id ? {
            ...p,
            ...updatePayment,
          } : p))
        },
      })
    },
  })

  const update = useCallback((payment) => {
    const id = payment.id
    const attributes = pick(payment, ['state', 'amount'])

    updatePayment({
      variables: { id, attributes },
      optimisticResponse: { updatePayment: { id, ...attributes } },
    })
  }, [updatePayment])

  if (!festival) return <Loader />

  return (
    <Template
      festival={festival}
      loading={loading}
      payments={payments}
      onAddPayment={() => {}}
      onUpdatePayment={update}
    />
  )
}

Payments.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
}

export default Payments