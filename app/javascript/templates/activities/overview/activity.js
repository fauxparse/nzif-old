import React from 'react'
import PropTypes from 'lib/proptypes'
import { Link } from 'react-router-dom'
import Time from 'atoms/time'
import Sentence from 'atoms/sentence'
import Card from 'molecules/card'

const Activity = ({
  loading,
  id,
  url,
  name,
  image,
  presenters,
  startsAt,
  endsAt,
}) => {
  return (
    <Card
      key={id}
      as={Link}
      to={url}
      loading={loading}
    >
      <Card.Image image={image} alt={name} />
      <Card.Category>
        <Time time={[startsAt, endsAt]} />
      </Card.Category>
      <Card.Title>{name}</Card.Title>
      <Card.Description>
        <Sentence>
          {presenters.map(p => p.name)}
        </Sentence>
      </Card.Description>
    </Card>
  )
}

Activity.propTypes = {
  loading: PropTypes.bool.isRequired,
  id: PropTypes.id.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  type: PropTypes.activityType.isRequired,
  presenters: PropTypes.arrayOf(PropTypes.presenter.isRequired),
  image: PropTypes.image,
  startsAt: PropTypes.time.isRequired,
  endsAt: PropTypes.time.isRequired,
}

Activity.defaultProps = {
  presenters: [],
  image: undefined,
}

export default Activity
