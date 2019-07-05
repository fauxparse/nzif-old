import React, { useCallback } from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import Avatar from 'atoms/avatar'
import Button from 'atoms/button'
import './index.scss'

const Chip = ({ className, user, small, onDelete, ...props }) => {
  const deleteFocused = e => e.target.blur()

  const deleteClicked = useCallback(() => onDelete && onDelete(user), [onDelete, user])

  const keyDown = useCallback((e) => {
    if (onDelete && (e.which === 8 || e.which === 46)) {
      e.preventDefault()
      onDelete(user)
    }
  }, [onDelete, user])

  return (
    <div
      className={classNames(
        'chip',
        small && 'chip--small',
        className
      )}
      tabIndex={0}
      onKeyDown={keyDown}
      {...props}
    >
      <Avatar className="chip__avatar" {...user} />
      <span className="chip__name">{user.name}</span>
      {onDelete && (
        <Button
          className="chip__delete"
          icon="close"
          tabIndex={-1}
          onClick={deleteClicked}
          onFocus={deleteFocused}
        />
      )}
    </div>
  )
}

Chip.propTypes = {
  className: PropTypes.className,
  user: PropTypes.user.isRequired,
  small: PropTypes.bool,
  onDelete: PropTypes.func,
}

Chip.defaultProps = {
  className: undefined,
  small: false,
  onDelete: undefined,
}

export default Chip
