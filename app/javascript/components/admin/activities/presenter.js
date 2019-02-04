import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import CommonProps from '../../../lib/proptypes'
import { WithPermission } from '../../../lib/permissions'
import Avatar from '../../shared/avatar'
import Button from '../../button'

const Presenter = ({ id, name, activity, className, onRemove }) => {
  return (
    <div className={classNames('presenter', className)}>
      <Avatar name={name} />
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
  id: CommonProps.id.isRequired,
  name: PropTypes.string.isRequired,
  activity: CommonProps.activity.isRequired,
  className: CommonProps.className,
  onRemove: PropTypes.func.isRequired,
}

export default Presenter
