import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Picture } from 'react-responsive-picture'
import classNames from 'classnames'
import CommonProps from '../../lib/common_props'

const COLORS = ['tomato', 'mandarin', 'grape', 'plum', 'apple', 'mint']

function hashCode(str) {
  let hash = 0

  for (let i = 0; i < str.length; i++) {
    const chr = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + chr
    hash |= 0
  }
  return Math.abs(hash)
}

const colorFromString = str => COLORS[hashCode(str) % COLORS.length]

const initials = str => str.split(/\s+/).map(s => s[0]).join('').toUpperCase().substr(0, 3)

const Avatar = forwardRef(
  ({ id, name, origin, bio, image, className, children, ...props }, ref) => (
    <span
      className={classNames('avatar', className)}
      ref={ref}
      title={name}
      data-color={name && colorFromString(name)}
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
  )
)

Avatar.displayName = 'Avatar'

Avatar.propTypes = {
  id: CommonProps.id,
  name: PropTypes.string.isRequired,
  image: CommonProps.userImage,
  origin: PropTypes.string,
  bio: PropTypes.string,
}

export default Avatar
