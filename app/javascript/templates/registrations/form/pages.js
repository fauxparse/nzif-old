import Details from './details'
import CodeOfConduct from './code_of_conduct'
import Workshops from './workshops'
import Payment from './payment'

export default [{
  name: 'details',
  label: 'Your details',
  icon: 'user',
  component: Details,
}, {
  name: 'code-of-conduct',
  label: 'Code of conduct',
  icon: 'code-of-conduct',
  component: CodeOfConduct,
}, {
  name: 'workshops',
  label: 'Workshops',
  icon: 'activities',
  component: Workshops,
}, {
  name: 'payment',
  label: 'Payment',
  icon: 'payment',
  component: Payment,
}]
