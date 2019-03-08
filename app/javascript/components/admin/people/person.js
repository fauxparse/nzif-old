import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import CommonProps from '../../../lib/common_props'
import Avatar from '../../shared/avatar'

const Person = ({ value: user, selected, onClick }) => {
  const { name, email } = user

  return (
    <li
      className={classNames('person', 'people__person', { 'people__person--selected': selected })}
      onClick={onClick}
    >
      <Avatar className="person__avatar" {...user} />
      <div className="person__name">{name}</div>
      <div className="person__email">{email}</div>
    </li>
  )
}

Person.propTypes = {
  value: CommonProps.user,
  selected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
}

export default Person