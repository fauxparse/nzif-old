import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import CommonProps from '../../lib/common_props'
import Icon from '../icons'
import Sentence from '../shared/sentence'
import { left as transition } from '../page_transition/slide'

const Pitch = ({ className, pitch, url }) => {
  return (
    <Link
      className={classNames('pitch-row', className)}
      data-state={pitch.state}
      to={{
        pathname: url,
        state: { transition }
      }}
    >
      <Icon className="pitch-row__icon" name="pitch" />
      <div className="pitch-row__name">
        {pitch.name || '(Untitled pitch)'}
      </div>
      <div className="pitch-row__presenters">
        <Sentence>{pitch.presenters.map(p => p.name)}</Sentence>
      </div>
      <div className="pitch-row__state">
        {pitch.state}
      </div>
    </Link>
  )
}

Pitch.propTypes = {
  pitch: PropTypes.shape({
    id: CommonProps.id.isRequired,
  }),
  url: PropTypes.string.isRequired,
}

export default Pitch
