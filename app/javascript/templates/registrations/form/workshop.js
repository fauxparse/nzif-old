import React, { Fragment, useCallback } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'lib/proptypes'
import Sentence from 'atoms/sentence'
import Button from 'atoms/button'
import Card from 'molecules/card'
import Skeleton from 'effects/skeleton'

const Workshop = ({ loading, session, position, onToggle, onSelect }) => {
  const { activity } = session
  const { name, image, presenters } = activity

  const toggle = useCallback(() => onToggle(session), [onToggle, session])

  const selected = position > 0

  const infoClicked = useCallback((e) => {
    e.stopPropagation()
    onSelect(session)
  }, [session])

  return (
    <Card
      className="workshop registration-form__workshop"
      loading={loading}
      aria-selected={selected || undefined}
      onClick={toggle}
    >
      <Card.Image image={image} alt={name} />
      <Skeleton
        as={Button}
        className="button--icon workshop__position"
        text={selected ? position.toString() : ' '}
      />
      <Card.Title>{name}</Card.Title>
      <Card.Description>
        <Sentence>
          {presenters.map(presenter => presenter.name)}
        </Sentence>
      </Card.Description>
      <Fragment>
        <Button
          center
          className="workshop__info"
          text="More info..."
          aria-label={`Read more about ${activity.name}`}
          icon="info"
          onClick={infoClicked}
        />
      </Fragment>
    </Card>
  )
}

Workshop.propTypes = {
  loading: PropTypes.bool,
  session: PropTypes.session.isRequired,
  position: PropTypes.number,
  onToggle: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
}

Workshop.defaultProps = {
  position: undefined,
}

export default Workshop
