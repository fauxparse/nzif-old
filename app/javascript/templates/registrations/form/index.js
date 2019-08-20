import React, { useCallback, useMemo, useRef, useEffect, useState } from 'react'
import PropTypes from 'lib/proptypes'
import Header from './header'
import Pager from './pager'
import Footer from './footer'
import PAGES from './pages'
import RegistrationFormContext from './context'

import './index.scss'

const RegistrationForm = ({ festival, user }) => {
  const container = useRef()

  const [page, setPage] = useState(2)

  const [valid, setValid] = useState(true)

  const scrollTop = useRef(0)

  const goToPage = useCallback((page) => {
    scrollTop.current = document.documentElement.scrollTop
    setPage(page)
  }, [scrollTop, setPage])

  const previousPage = useCallback(() => {
    goToPage(page - 1)
  }, [page, goToPage])

  const nextPage = useCallback(() => {
    goToPage(page + 1)
  }, [page, goToPage])

  const Component = useMemo(() => PAGES[page].component, [page])

  React.useEffect(() => {
    if (!container.current) return
    const header = container.current.querySelector('.registration-form__header')
    const pager = container.current.querySelector('.registration-form__pager')
    const maxScrollTop = pager.offsetTop - header.offsetHeight
    window.scrollTo(0, Math.min(maxScrollTop, scrollTop.current))
  }, [page])

  const [registration, setRegistration] = useState({ workshops: [] })

  const [changes, setChanges] = useState({})

  const onChange = useCallback(({ valid = true, attributes = {} }) => {
    setValid(valid)
    setChanges({ ...changes, ...attributes })
  }, [setValid, setChanges, changes])

  const combined = useMemo(() => ({ ...registration, ...changes }), [registration, changes])

  return (
    <RegistrationFormContext.Provider value={{
      page: PAGES[page],
      pageIndex: page,
      user,
      registration: combined,
    }}>
      <section ref={container} className="registration-form">
        <h1 className="registration-form__title">Register for NZIF {festival.year}</h1>
        <Header />
        <Pager>
          <Component onChange={onChange} />
        </Pager>
        <Footer
          valid={valid}
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