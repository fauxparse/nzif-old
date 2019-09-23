import PropTypes from 'prop-types'
import ReactRouterPropTypes from 'react-router-prop-types'
import MomentPropTypes from 'react-moment-proptypes'
import { Color } from './palette'
import ICONS from 'atoms/icon/all'
import ROLES from './roles'

export const id = PropTypes.oneOfType([
  PropTypes.number.isRequired,
  PropTypes.string.isRequired,
])

export const ref = PropTypes.shape({
  current: PropTypes.instanceOf(Element),
})

export const className = PropTypes.any

export const component = PropTypes.any

export const color = PropTypes.instanceOf(Color)

export const activityType = PropTypes.oneOf([
  'workshop',
  'show',
  'social_event',
  'forum',
])

export const activityLevel = PropTypes.oneOf([
  'beginner',
  'intermediate',
  'advanced',
])

export const location = PropTypes.oneOfType([
  ReactRouterPropTypes.location.isRequired,
  PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  PropTypes.string.isRequired,
])

export const role = PropTypes.oneOf(ROLES)

export const icon = PropTypes.oneOf(ICONS)

export const image = PropTypes.shape({
  thumbnail: PropTypes.string,
  small: PropTypes.string,
  medium: PropTypes.string,
  full: PropTypes.string,
})

export const user = PropTypes.shape({
  id: id.isRequired,
  name: PropTypes.string,
  email: PropTypes.string,
  roles: PropTypes.arrayOf(role.isRequired),
  image,
})

export const presenter = PropTypes.shape({
  id,
  name: PropTypes.string.isRequired,
  email: PropTypes.string,
  image,
})

export const activity = PropTypes.shape({
  id: id.isRequired,
  name: PropTypes.string.isRequired,
  type: activityType.isRequired,
  url: PropTypes.string,
  levels: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.string,
  presenters: PropTypes.arrayOf(presenter.isRequired),
  image,
})

export const session = PropTypes.shape({
  id,
  activity: PropTypes.any,
  startsAt: PropTypes.oneOfType([
    MomentPropTypes.momentObj,
    PropTypes.string
  ]).isRequired,
  endsAt: PropTypes.oneOfType([
    MomentPropTypes.momentObj,
    PropTypes.string
  ]),
  venueId: id,
  capacity: PropTypes.number,
  full: PropTypes.bool,
})

export const time = PropTypes.oneOfType([
  MomentPropTypes.momentObj,
  PropTypes.string,
  PropTypes.number,
])

export const pitch = PropTypes.shape({
  id,
  name: PropTypes.string,
  presenters: PropTypes.arrayOf(presenter),
  pile: PropTypes.string,
  gender: PropTypes.string,
  origin: PropTypes.string,
  submittedAt: time,
})

export const venue = PropTypes.shape({
  id,
  name: PropTypes.string.isRequired,
  address: PropTypes.string,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
})

export const festival = PropTypes.shape({
  year: id.isRequired,
  state: PropTypes.oneOf([
    'pending',
    'pitching',
    'programming',
    'earlybird',
    'allocating',
    'registration',
    'finished',
  ])
})

export const preference = PropTypes.shape({
  sessionId: id.isRequired,
  position: PropTypes.number.isRequired,
})

export const registration = PropTypes.shape({
  id: id.isRequired,
  user: user.isRequired,
  preferences: PropTypes.arrayOf(preference.isRequired),
  payments: PropTypes.array,
})

export const allocation = PropTypes.shape({
  registrationId: id.isRequired,
  sessionId: id,
  locked: PropTypes.bool,
})

export const payment = PropTypes.shape({
  id,
  amount: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  createdAt: time,
  state: PropTypes.oneOf(['pending', 'approved', 'declined', 'cancelled']),
  registration,
})

export const historyItem = PropTypes.shape({
  id,
  icon,
  description: PropTypes.string,
  timestamp: PropTypes.time,
})

export default {
  ...PropTypes,
  activity,
  activityLevel,
  activityType,
  allocation,
  className,
  color,
  component,
  festival,
  historyItem,
  icon,
  id,
  image,
  location,
  payment,
  pitch,
  preference,
  presenter,
  ref,
  registration,
  session,
  time,
  user,
  venue,
}
