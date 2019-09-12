import React, { useMemo } from 'react'
import PropTypes from 'lib/proptypes'

const Finalizing = ({ festival }) => {
  return (
    <section className="homepage__panel homepage__register-now homepage__register-now--earlybird">
      <h2 className="section-title">Hold tight...</h2>
      <p>
        We’re currently finalising the first round of workshop allocations from our earlybird
        participants. This could take a couple of days, so please be patient.
      </p>
      <p>
        If you missed out on earlybird registration, don’t sweat! Registrations will be back online
        soon and there’ll still be plenty of options available.
      </p>
    </section>
  )
}

Finalizing.propTypes = {
  festival: PropTypes.festival.isRequired,
}

export default Finalizing
