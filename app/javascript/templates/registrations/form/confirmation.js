import React from 'react'
import { useRegistration } from 'contexts/registration'
import Button from 'atoms/button'
import Heading from './heading'

const Confirmation = () => {
  const { registration } = useRegistration()

  return (
    <section className="registration-form__section registration-form__confirmation">
      <Heading>All done!</Heading>
      <p>
        <b>Congratulations! You’re coming to NZIF!</b>
      </p>
      <p>
        Check your email for a confirmation message. You’ll receive another email when we
        confirm your workshop allocations, including an invoice for your total registration fee.
      </p>
      <p>
        In the meantime, all the cool kids are hanging out in the NZIF Green Room on Facebook.
        Why not head there and check out the latest from the Festival?
      </p>
      <p>
        <Button
          as="a"
          href="https://www.facebook.com/groups/NZIFGreenRoom/"
          rel="noopener noreferrer"
          icon="facebook"
          text="NZIF Green Room"
          primary
        />
      </p>
    </section>
  )
}

export default Confirmation
