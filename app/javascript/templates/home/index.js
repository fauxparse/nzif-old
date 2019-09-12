import React from 'react'
import PropTypes from 'lib/proptypes'
import Loader from 'atoms/loader'
import Masthead from 'atoms/masthead'
import PitchCountdown from './pitch_countdown'
import PitchesClosed from './pitches_closed'
import EarlybirdRegistration from './earlybird_registration'
import Finalizing from './finalizing'
import Registration from './registration'
import Purpose from './purpose'

import './index.scss'

const CONTENT = {
  pitching: PitchCountdown,
  programming: PitchesClosed,
  earlybird: EarlybirdRegistration,
  allocating: Finalizing,
  registration: Registration,
}

const Home = ({ loading, festival }) => {
  const { state } = festival || {}

  const Content = CONTENT[state]

  return (
    <section className="homepage">
      {(!loading && festival) ? (
        <>
          <Masthead festival={festival} />
          {Content && <Content festival={festival} />}
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
