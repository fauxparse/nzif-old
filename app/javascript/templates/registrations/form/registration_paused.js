import React from 'react'
import Divider from 'atoms/divider'

const TemporarilyClosed = () => (
  <section className="registration-paused">
    <h1 className="registration-form__title">Registrations are temporarily closed.</h1>
    <Divider accent />
    <p>
      We’re currently reviewing earybird registrations and allocating initial workshop places.
    </p>
    <p>
      Registrations will be back online soon: we’ll send you an email when that happens.
      Thanks for your patience!
    </p>
  </section>
)

export default TemporarilyClosed
