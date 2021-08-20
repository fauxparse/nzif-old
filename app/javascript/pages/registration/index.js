import React, { useCallback, useContext, useEffect, useState } from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import { withRouter } from 'react-router-dom'
import { RegistrationProvider } from 'contexts/registration'
import FestivalContext from 'contexts/festival'
import Loader from 'atoms/loader'
import PAGES from 'templates/registrations/form/pages'
import Form from './form'
import Covid from './covid'

const RegistrationPage = ({ match, history }) => {
  const festival = useContext(FestivalContext)

  const { year, page } = match.params

  const [currentPage, setCurrentPage] =
    useState(() => PAGES.find(({ name }) => name === page) || PAGES[0])

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
      <Form
        festival={festival}
        page={currentPage}
        onPageChange={pageChanged}
      />
      <Covid />
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
