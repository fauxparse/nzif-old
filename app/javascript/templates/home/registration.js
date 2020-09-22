import React, { useMemo } from 'react'
import PropTypes from 'lib/proptypes'
import moment from 'lib/moment'
import RegisterButton from 'molecules/register_button'
import Countdown from './countdown'

const Registration = ({ festival }) => {
  const { year, deadline } = festival || {}

  const cutoff = useMemo(() => deadline && moment(deadline), [deadline])

  return (
    <section className="homepage__panel homepage__register-now homepage__register-now--earlybird">
      <h2 className="section-title">Register now for NZIF {year}</h2>
      <p>
        Registrations are now open!
      </p>
      <RegisterButton to={`/${year}/register`} />
      {cutoff && (
        <>
          <p>
            NZIF {year} starts in
          </p>
          <Countdown to={deadline} />
        </>
      )}
    </section>
  )
}

Registration.propTypes = {
  festival: PropTypes.festival.isRequired,
}

export default Registration
