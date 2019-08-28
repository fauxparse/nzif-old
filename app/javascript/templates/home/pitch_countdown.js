import React from 'react'
import PropTypes from 'lib/proptypes'
import { Link } from 'react-router-dom'
import Button from 'atoms/button'
import Countdown from './countdown'

const PitchCountdown = ({ festival }) => {
  const { year, deadline } = festival || {}

  return (
    <section className="homepage__panel">
      <h2 className="section-title">What’s up, pitches?</h2>
      <p>Pitches for NZIF {year} close in</p>
      <Countdown to={deadline} />
      <p>
        <Button primary as={Link} to={`${year}/pitches/new`} text="Pitch us your idea!" />
      </p>
    </section>
  )
}

PitchCountdown.propTypes = {
  festival: PropTypes.festival.isRequired,
}

export default PitchCountdown
