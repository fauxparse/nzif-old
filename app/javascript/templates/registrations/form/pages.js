import isEmpty from 'lodash/isEmpty'
import validate from 'validate.js'
import Details from './details'
import CodeOfConduct from './code_of_conduct'
import Workshops from './workshops'
import Availability from './availability'
import Payment from './payment'
import Confirmation from './confirmation'

validate.validators.noPendingCreditCardPayments = (payments) => {
  if (payments && payments.find(p => p.type === 'credit_card' && p.state === 'pending' && p.reference)) {
    return 'will redirect now'
  }
}

export default [{
  name: 'details',
  label: 'Your details',
  icon: 'user',
  component: Details,
  validations: {
    name: { presence: { allowEmpty: false } },
    email: { presence: { allowEmpty: false } },
    password: (_, { user }) => {
      return user ? null : { presence: { allowEmpty: false } }
    },
    passwordConfirmation: (_, { user }) => {
      return user ? null : { presence: { allowEmpty: false } }
    },
  },
}, {
  name: 'code-of-conduct',
  label: 'Code of conduct',
  icon: 'code-of-conduct',
  component: CodeOfConduct,
  validations: {
    codeOfConductAcceptedAt: {
      presence: true,
    },
  },
}, {
  name: 'workshops',
  label: 'Workshops',
  icon: 'activities',
  component: Workshops,
  validations: {},
// }, {
//   name: 'availability',
//   label: 'Availability',
//   icon: 'availability',
//   component: Availability,
//   validations: {},
}, {
  name: 'payment',
  label: 'Payment',
  icon: 'payment',
  component: Payment,
  validations: {
    paymentMethod: (_, { totalToPay }) => totalToPay ? { presence: { allowEmpty: false } } : null,
    payments: { noPendingCreditCardPayments: true },
  },
}, {
  name: 'confirmation',
  label: 'Confirmation',
  icon: 'check',
  component: Confirmation,
  validations: {
    payments: (_, { workshops }) =>
      !isEmpty(workshops) ? { presence: { allowEmpty: false } } : null,
  },
}]
