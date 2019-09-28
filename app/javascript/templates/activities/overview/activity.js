import React from 'react'
import PropTypes from 'lib/proptypes'
import humanize from 'lib/humanize'
import { Link } from 'react-router-dom'
import Time from 'atoms/time'
import Sentence from 'atoms/sentence'
import Card from 'molecules/card'

const Activity = ({
  loading,
  id,
  type,
  url,
  name,
  image,
  presenters,
  startsAt,
  endsAt,
  levels,
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
  levels: PropTypes.arrayOf(PropTypes.string),
  presenters: PropTypes.arrayOf(PropTypes.presenter.isRequired),
  image: PropTypes.image,
}

Activity.defaultProps = {
  levels: [],
  presenters: [],
  image: undefined,
}

export default Activity
