import React from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import Avatar from 'atoms/avatar'
import Markdown from 'molecules/markdown'

const PresenterBio = ({ className, presenter }) => (
  <div className={classNames('presenter-bio', className)}>
    <div className="presenter-bio__title">
      <Avatar className="presenter-bio__avatar" {...presenter} />
      <span className="presenter-bio__name-and-origin">
        <span className="presenter-bio__name">{presenter.name}</span>
        <span className="presenter-bio__origin">{presenter.origin}</span>
      </span>
    </div>
    <Markdown className="presenter-bio__bio" text={presenter.bio} />
  </div>
)

export default PresenterBio
