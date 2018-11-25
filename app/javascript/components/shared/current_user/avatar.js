import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import mojs from 'mo-js'
import colors from '../../../themes/colors'
import { transition } from '../../../styles'
import Avatar from '../avatar'

export const StyledAvatar = styled(Avatar)`
  position: relative;

  &::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    width: 0.625em;
    height: 0.625em;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 0.125em ${({ theme }) => theme.colors.background};
    transform: scale(1);
    transition: ${transition('transform')};
  }

  &[data-notification-count="0"]::after {
    transform: scale(0);
  }
`

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
          fill: colors.accent,
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
      <StyledAvatar
        ref={this.avatar}
        name={user.name}
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
