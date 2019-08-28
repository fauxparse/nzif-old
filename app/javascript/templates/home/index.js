import React from 'react'
import PropTypes from 'lib/proptypes'
import Loader from 'atoms/loader'
import Masthead from 'atoms/masthead'
import PitchCountdown from './pitch_countdown'
import PitchesClosed from './pitches_closed'
import EarlybirdRegistration from './earlybird_registration'
import Purpose from './purpose'

import './index.scss'

const Home = ({ loading, festival }) => {
  const { state } = festival || {}

  return (
    <section className="homepage">
      {(!loading && festival) ? (
        <>
          <Masthead festival={festival} />
          {state === 'pitching' && <PitchCountdown festival={festival} />}
          {state === 'programming' && <PitchesClosed festival={festival} />}
          {state === 'earlybird' && <EarlybirdRegistration festival={festival} />}
          <Purpose />
        </>
      ) : <Loader />}
    </section>
  )
}

Home.propTypes = {
  loading: PropTypes.bool,
  festival: PropTypes.festival,
}

Home.defaultProps = {
  loading: false,
  festival: null,
}

export default Home
