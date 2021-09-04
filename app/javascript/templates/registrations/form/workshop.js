import React, { Fragment, useCallback } from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import Sentence from 'atoms/sentence'
import Button from 'atoms/button'
import Level from 'atoms/level'
import Tooltip from 'atoms/tooltip'
import Card from 'molecules/card'
import Skeleton from 'effects/skeleton'

const Workshop = ({
  loading,
  session,
  position,
  selected,
  wasSelected,
  waitlisted,
  disabled,
  onToggle,
  onSelect
}) => {
  const { activity } = session
  const { name, image, presenters, levels = [] } = activity

  const toggle = useCallback(() => {
    if (!disabled) onToggle(session)
  }, [disabled, onToggle, session])

  const infoClicked = useCallback((e) => {
    e.stopPropagation()
    onSelect(session)
  }, [onSelect, session])

  const captureClick = (e) => e.stopPropagation()

  const full = session.full && (selected || !wasSelected)

  const fullTitle =
    selected
      ? 'Don’t worry! You’ve already got a spot in this workshop.'
      : waitlisted
        ? 'You’re on the waitlist. We’ll contact you if a spot comes up.'
        : 'This workshop is full. Click to join the waitlist.'

  const label = selected ? 'Selected' : (position > 0 ? `Selected, option ${position}` : 'Not selected')

  return (
    <Card
      className={classNames(
        'workshop',
        'registration-form__workshop',
        selected && 'registration-form__workshop--selected',
        full && 'registration-form__workshop--full',
      )}
      loading={loading}
      aria-selected={selected || position > 0 || undefined}
      aria-disabled={disabled || undefined}
      onClick={toggle}
    >
      <Card.Image image={image} alt={name} />
      <Skeleton
        as={Button}
        className="button--icon workshop__position"
        text={position > 0 && position.toString() || ''}
        icon={selected ? 'check' : (waitlisted ? 'waitlist' : undefined)}
        aria-label={label}
      />
      <Fragment>
        {full && (
          <Tooltip className="workshop__full" title={fullTitle}>
            Sold out!
          </Tooltip>
        )}
      </Fragment>
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
  selected: PropTypes.bool,
  wasSelected: PropTypes.bool,
  waitlisted: PropTypes.bool,
  disabled: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
}

Workshop.defaultProps = {
  position: undefined,
  loading: false,
  disabled: false,
  selected: false,
  wasSelected: false,
  waitlisted: false,
}

export default Workshop
