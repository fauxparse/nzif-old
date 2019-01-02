import PropTypes from 'prop-types'

export const id = PropTypes.oneOfType([
  PropTypes.number.isRequired,
  PropTypes.string.isRequired,
])

export const activityType = PropTypes.oneOf([
  'workshop',
  'show',
])

export const activity = PropTypes.shape({
  id: id.isRequired,
  name: PropTypes.string.isRequired,
  type: activityType.isRequired,
  url: PropTypes.string,
})

export default {
  activity,
  activityType,
  id,
}
