import React from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import { WithPermission } from 'lib/permissions'
import Avatar from 'atoms/avatar'
import Button from 'atoms/button'

const Presenter = ({ id, name, image, activity, className, onRemove }) => {
  return (
    <div className={classNames('presenter', className)}>
      <Avatar name={name} image={image} />
      <span className="presenter__name">{name}</span>
      <WithPermission to="update" subject={activity}>
        <Button
          className="presenter__remove"
          icon="close"
          onClick={() => onRemove(id)}
        />
      </WithPermission>
    </div>
  )
}

Presenter.propTypes = {
  id: PropTypes.id.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.shape({
    small: PropTypes.string.isRequired,
    medium: PropTypes.string.isRequired,
  }),
  activity: PropTypes.activity.isRequired,
  className: PropTypes.className,
  onRemove: PropTypes.func.isRequired,
}

export default Presenter
