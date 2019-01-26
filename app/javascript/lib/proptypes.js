import PropTypes from 'prop-types'
import MomentPropTypes from 'react-moment-proptypes'
import { Color } from './palette'

export const id = PropTypes.oneOfType([
  PropTypes.number.isRequired,
  PropTypes.string.isRequired,
])

export const ref = PropTypes.shape({
  current: PropTypes.instanceOf(Element),
})

export const className = PropTypes.any

export const color = PropTypes.instanceOf(Color)

export const activityType = PropTypes.oneOf([
  'workshop',
  'show',
])

export const role = PropTypes.oneOf([
  'admin',
])

export const user = PropTypes.shape({
  id: id.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string,
  roles: PropTypes.arrayOf(role.isRequired),
})

export const activity = PropTypes.shape({
  id: id.isRequired,
  name: PropTypes.string.isRequired,
  type: activityType.isRequired,
  url: PropTypes.string,
  levels: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.string,
  presenters: PropTypes.arrayOf(user.isRequired).isRequired,
})

export const session = PropTypes.shape({
  id,
  activity: PropTypes.any,
  startsAt: MomentPropTypes.momentObj.isRequired,
  endsAt: MomentPropTypes.momentObj.isRequired,
  venueId: id,
})

export default {
  activity,
  activityType,
  className,
  color,
  id,
  ref,
  session,
  user,
}
