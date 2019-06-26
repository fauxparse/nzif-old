import React from 'react'
import PropTypes from 'prop-types'
import mojs from 'mo-js'
import Avatar from 'atoms/avatar'

class AvatarWithNotifications extends React.Component {
  avatar = React.createRef()

  componentDidUpdate(prevProps) {
    if (this.props.notificationsCount > prevProps.notificationsCount) {
      this.burst.play()
    }
  }

  get burst() {
    if (!this._burst) {
      this._burst = new mojs.Burst({
        parent: this.avatar.current,
        left: '100%',
        top: '100%',
        x: -5,
        y: -5,
        radius: { 4: 16 },
        angle: 45,
        count: 14,
        children: {
          radius: 2.5,
          fill: 'hsl(4, 85%, 57%)',
          scale: { 1: 0, easing: 'quad.in' },
          pathScale: [0.8, null],
          degreeShift: [13, null],
          duration: [500, 700],
          easing: 'quint.out'
        }
      })
    }
    return this._burst
  }

  render() {
    const { user, notificationsCount } = this.props

    return (
      <Avatar
        ref={this.avatar}
        name={user.name}
        image={user.image}
        data-notification-count={notificationsCount}
      />
    )
  }
}

AvatarWithNotifications.propTypes = {
  user: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
  notificationsCount: PropTypes.number
}

AvatarWithNotifications.defaultProps = {
  notificationsCount: 0
}

export default AvatarWithNotifications
