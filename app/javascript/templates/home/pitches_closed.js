import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'atoms/button'

const PitchesClosed = () => (
  <section className="homepage__panel homepage__pitches--closed">
    <h2 className="section-title">Pitches are now closed</h2>
    <p>
      We are reviewing applications,
      and will announce the full programme in due course.
    </p>
    <p>
      In the meantime, join the NZIF Green Room group on Facebook
      to keep up with all the latest Festival news.
    </p>
    <p>
      <Button
        primary
        as={Link}
        to="https://www.facebook.com/groups/NZIFGreenRoom/"
        icon="facebook"
        text="NZIF Green Room"
      />
    </p>
  </section>
)

export default PitchesClosed
