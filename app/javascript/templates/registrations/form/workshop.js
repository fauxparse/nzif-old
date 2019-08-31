import React, { Fragment, useCallback } from 'react'
import PropTypes from 'lib/proptypes'
import Sentence from 'atoms/sentence'
import Button from 'atoms/button'
import Level from 'atoms/level'
import Card from 'molecules/card'
import Skeleton from 'effects/skeleton'

const Workshop = ({ loading, session, position, disabled, onToggle, onSelect }) => {
  const { activity } = session
  const { name, image, presenters, levels = [] } = activity

  const toggle = useCallback(() => {
    if (!disabled) onToggle(session)
  }, [disabled, onToggle, session])

  const selected = position > 0

  const infoClicked = useCallback((e) => {
    e.stopPropagation()
    onSelect(session)
  }, [onSelect, session])

  const captureClick = (e) => e.stopPropagation()

  return (
    <Card
      className="workshop registration-form__workshop"
      loading={loading}
      aria-selected={selected || undefined}
      aria-disabled={disabled || undefined}
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
        <div className="workshop__levels" onClick={captureClick}>
          {levels.map(level => (
            <Level tiny level={level} key={level} />
          ))}
        </div>
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
  disabled: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
}

Workshop.defaultProps = {
  position: undefined,
  loading: false,
  disabled: false,
}

export default Workshop
