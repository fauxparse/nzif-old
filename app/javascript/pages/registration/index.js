import React, { useContext } from 'react'
import RegistrationForm from 'templates/registrations/form'
import { RegistrationProvider } from 'contexts/registration'
import FestivalContext from 'contexts/festival'
import Loader from 'atoms/loader'

const RegistrationPage = () => {
  const festival = useContext(FestivalContext)

  return festival ? (
    <RegistrationProvider>
      <RegistrationForm festival={festival} />
    </RegistrationProvider>
  ) : (
    <Loader />
  )
}

export default RegistrationPage
