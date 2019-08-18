import React, { useCallback, useMemo, useState } from 'react'
import PropTypes from 'lib/proptypes'
import Header from './header'
import Pager from './pager'
import Footer from './footer'
import PAGES from './pages'
import RegistrationFormContext from './context'

import './index.scss'

const RegistrationForm = ({ festival, user }) => {
  const [page, setPage] = useState(0)

  const previousPage = useCallback(() => setPage(page - 1), [page, setPage])

  const nextPage = useCallback(() => setPage(page + 1), [page, setPage])

  const Component = useMemo(() => PAGES[page].component, [page])

  return (
    <RegistrationFormContext.Provider value={{
      page: PAGES[page],
      pageIndex: page,
      user,
    }}>
      <section className="registration-form">
        <h1 className="registration-form__title">Register for NZIF {festival.year}</h1>
        <Header />
        <Pager>
          <Component />
        </Pager>
        <Footer
          onBackClick={previousPage}
          onNextClick={nextPage}
        />
      </section>
    </RegistrationFormContext.Provider>
  )
}

RegistrationForm.propTypes = {
  festival: PropTypes.shape({
    year: PropTypes.id.isRequired,
  }).isRequired,
  user: PropTypes.user,
}

RegistrationForm.defaultProps = {
  user: null,
}

export default RegistrationForm
