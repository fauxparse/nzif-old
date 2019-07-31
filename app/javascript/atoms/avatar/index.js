import React, { forwardRef } from 'react'
import PropTypes from 'lib/proptypes'
import { Picture } from 'react-responsive-picture'
import classNames from 'classnames'
import './index.scss'

const COLORS = ['tomato', 'mandarin', 'grape', 'plum', 'apple', 'mint']

const hashCode = (str) => {
  let hash = 0

  for (let i = 0; i < str.length; i++) {
    const chr = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + chr
    hash |= 0
  }
  return Math.abs(hash)
}

const colorFromString = str => COLORS[hashCode(str) % COLORS.length]

const initials = str =>
  str.replace(/[^\w\s]/g, '').split(/\s+/).map(s => s[0]).join('').toUpperCase().substr(0, 3)

const Avatar = forwardRef(({
  id,
  name,
  origin,
  bio,
  image,
  className,
  notificationsCount,
  children,
  ...props
}, ref) => (
  <span
    className={classNames('avatar', className)}
    ref={ref}
    title={name}
    data-color={name && colorFromString(name)}
    data-notifications-count={notificationsCount}
    {...props}
  >
    {image ? (
      <Picture
        className="avatar__image"
        sources={[{ srcSet: `${image.small}, ${image.medium} 2x` }]}
        alt={name}
      />
    ) : (
      children || initials(name)
    )}
  </span>
))

Avatar.displayName = 'Avatar'

Avatar.propTypes = {
  id: PropTypes.id,
  name: PropTypes.string.isRequired,
  image: PropTypes.userImage,
  origin: PropTypes.string,
  bio: PropTypes.string,
  notificationsCount: PropTypes.number,
}

Avatar.defaultProps = {
  notificationsCount: undefined,
}

export default Avatar
