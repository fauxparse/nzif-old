import Details from './details'
import CodeOfConduct from './code_of_conduct'
import Workshops from './workshops'
import Availability from './availability'
import Payment from './payment'

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
}, {
  name: 'availability',
  label: 'Availability',
  icon: 'availability',
  component: Availability,
  validations: {},
}, {
  name: 'payment',
  label: 'Payment',
  icon: 'payment',
  component: Payment,
  validations: {},
}]
