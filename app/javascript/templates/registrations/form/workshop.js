import React, { useCallback } from 'react'
import PropTypes from 'lib/proptypes'
import humanize from 'lib/humanize'
import Sentence from 'atoms/sentence'
import Button from 'atoms/button'
import Card from 'molecules/card'
import Skeleton from 'effects/skeleton'

const Workshop = ({ loading, activity, position, onToggle }) => {
  const { name, type, image, presenters } = activity

  const toggle = useCallback(() => onToggle(activity), [onToggle, activity])

  const selected = position > 0

  return (
    <Card
      className="workshop registration-form__workshop"
      loading={loading}
      aria-selected={selected || undefined}
    >
      <Card.Image image={image} alt={name} />
      <Card.Category>{humanize(type)}</Card.Category>
      <Card.Title>{name}</Card.Title>
      <Card.Description>
        <Skeleton
          as={Button}
          className="workshop__position"
          onClick={toggle}
          text={selected ? position : ' '}
        />
        <Sentence>
          {presenters.map(presenter => presenter.name)}
        </Sentence>
      </Card.Description>
    </Card>
  )
}

Workshop.propTypes = {
  loading: PropTypes.bool,
  activity: PropTypes.activity.isRequired,
  position: PropTypes.number,
  onToggle: PropTypes.func.isRequired,
}

Workshop.defaultProps = {
  position: undefined,
}

export default Workshop
