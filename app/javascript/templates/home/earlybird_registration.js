import React, { useMemo } from 'react'
import PropTypes from 'lib/proptypes'
import moment from 'lib/moment'
import Date from 'atoms/date'
import RegisterButton from 'molecules/register_button'
import Countdown from './countdown'

const RegisterNow = ({ festival }) => {
  const { year, deadline } = festival || {}

  const cutoff = useMemo(() => deadline && moment(deadline), [deadline])

  return (
    <section className="homepage__panel homepage__register-now homepage__register-now--earlybird">
      <h2 className="section-title">Register now for NZIF {year}</h2>
      <p>
        Earlybird registrations are now open! Select your preferred workshops to
        be considered for our first round of workshop allocations on
        {' '}
        <Date date={deadline} />
        .
      </p>
      <RegisterButton to={`/${year}/register`} />
      {cutoff && (
        <>
          <p>
            Earlybird registration closes in
          </p>
          <Countdown to={deadline} />
        </>
      )}
    </section>
  )
}

RegisterNow.propTypes = {
  festival: PropTypes.festival.isRequired,
}

export default RegisterNow
