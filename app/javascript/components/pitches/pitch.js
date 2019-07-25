import React from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import Button from 'atoms/button'
import List from 'molecules/list'
import Sentence from 'atoms/sentence'
import { left as transition } from '../page_transition/slide'

const Pitch = ({ className, pitch, url, onDelete }) => {
  return (
    <List.Item
      className={classNames('pitch-row', className)}
      data-state={pitch.state}
      icon="pitch"
    >
      <div className="pitch-row__content">
        <div className="list-item__primary">
          {pitch.name || '(Untitled pitch)'}
        </div>
        <div className="list-item__secondary">
          <Sentence>{pitch.presenters.map(p => p.name).join(', ')}</Sentence>
        </div>
        {pitch.state === 'draft' ? (
          <div className="pitch-row__actions">
            <Button
              as={Link}
              to={{
                pathname: url,
                state: { transition }
              }}
              primary
              icon="edit"
              aria-label="Edit"
            />
            <Button
              icon="trash"
              aria-label="Delete"
              onClick={() => onDelete(pitch.id)}
            />
          </div>
        ) : (
          <div className="pitch-row__state">
            {pitch.state}
          </div>
        )}
      </div>
    </List.Item>
  )
}

Pitch.propTypes = {
  pitch: PropTypes.shape({
    id: PropTypes.id.isRequired,
    name: PropTypes.string,
    state: PropTypes.string,
    presenters: PropTypes.arrayOf(PropTypes.presenter.isRequired).isRequired,
  }),
  url: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default Pitch
