import React from 'react'
import classNames from 'classnames'
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

export default Person
