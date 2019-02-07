import React from 'react'
import PropTypes from 'prop-types'
import Link from '../shared/text_link'
import Date from '../shared/date'

const AssociatedShow = ({ name, url, session }) => <>
  Participants in this workshop may be considered for casting in the show{' '}
  <Link to={url}>{name}</Link>,{' '}
  on <Date date={session.startsAt} />.
</>

const AssociatedWorkshop = ({ name, url, session }) => <>
  This show will be cast from the associated workshop,{' '}
  <Link to={url}>{name}</Link>,{' '}
  on <Date date={session.startsAt} />.
</>

const Associated = ({ type, name, url, sessions }) => {
  const session = sessions[0]
  const Content = type === 'show' ? AssociatedShow : AssociatedWorkshop
  return (
    <div className={`associated associated--${type}`}>
      <Content {...{ name, url, session }} />
    </div>
  )
}

export default Associated
