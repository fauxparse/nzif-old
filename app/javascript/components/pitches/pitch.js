import React from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import Icon from '../../atoms/icon'
import Button from '../../atoms/button'
import Sentence from '../shared/sentence'
import Link from '../shared/ripple/link'
import { left as transition } from '../page_transition/slide'

const Pitch = ({ className, pitch, url, onDelete }) => {
  return (
    <div
      className={classNames('pitch-row', className)}
      data-state={pitch.state}
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
      {pitch.state === 'draft' &&
        <div className="pitch-row__actions">
          <Link
            className="button"
            to={{
              pathname: url,
              state: { transition }
            }}
          >
            <Button.Icon name="edit" />
            <Button.Text>Edit</Button.Text>
          </Link>
          <Button
            icon="trash"
            text="Delete"
            onClick={() => onDelete(pitch.id)}
          />
        </div>
      }
    </div>
  )
}

Pitch.propTypes = {
  pitch: PropTypes.shape({
    id: PropTypes.id.isRequired,
    name: PropTypes.string,
    state: PropTypes.string,
  }),
  url: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default Pitch
