import React, { useCallback, useContext, useEffect, useState } from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import { withRouter } from 'react-router-dom'
import RegistrationForm from 'templates/registrations/form'
import { RegistrationProvider } from 'contexts/registration'
import FestivalContext from 'contexts/festival'
import Loader from 'atoms/loader'
import PAGES from 'templates/registrations/form/pages'

const RegistrationPage = ({ match, history }) => {
  const festival = useContext(FestivalContext)

  const { year, page } = match.params

  const [currentPage, setCurrentPage] = useState(PAGES.find(({ name }) => name === page))

  useEffect(() => {
    setCurrentPage(PAGES.find(({ name }) => name === page))
  }, [page])

  useEffect(() => {
    if (currentPage) {
      if (currentPage.name !== page) {
        history.push(`/${year}/register/${currentPage.name}`)
      }
    } else {
      history.replace(`/${year}/register/${PAGES[0].name}`)
    }
  }, [currentPage, history, year, page])

  const pageChanged = useCallback((page) => {
    if (page !== currentPage) {
      setCurrentPage(page)
    }
  }, [currentPage, setCurrentPage])

  return festival ? (
    <RegistrationProvider>
      <RegistrationForm
        festival={festival}
        page={currentPage}
        onPageChange={pageChanged}
      />
    </RegistrationProvider>
  ) : (
    <Loader />
  )
}

RegistrationPage.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
}

export default withRouter(RegistrationPage)
