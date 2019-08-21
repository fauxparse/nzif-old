import React, { useCallback, useMemo, useRef, useState } from 'react'
import PropTypes from 'lib/proptypes'
import Header from './header'
import Pager from './pager'
import Footer from './footer'
import PAGES from './pages'
import RegistrationFormContext from './context'

import './index.scss'

const RegistrationForm = ({ festival, user }) => {
  const container = useRef()

  const [page, setPage] = useState(0)

  const [valid, setValid] = useState(true)

  const scrollTop = useRef(0)

  const goToPage = useCallback((page) => {
    scrollTop.current = document.documentElement.scrollTop
    setPage(page)
  }, [setPage])

  const previousPage = useCallback(() => {
    goToPage(page - 1)
  }, [page, goToPage])

  const nextPage = useCallback(() => {
    goToPage(page + 1)
  }, [page, goToPage])

  const Component = useMemo(() => PAGES[page].component, [page])

  React.useLayoutEffect(() => {
    if (!container.current) return
    const pager = container.current.querySelector('.registration-form__pager')
    const header = container.current.querySelector('.registration-form__header')
    const maxScrollTop = pager.getBoundingClientRect().y + scrollTop.current - header.offsetHeight
    document.documentElement.scrollTop = Math.min(scrollTop.current, maxScrollTop)
  }, [page])

  const onChange = useCallback(({ valid = true }) => {
    setValid(valid)
  }, [setValid])

  const providerValue = useMemo(() => ({
    page: PAGES[page],
    pageIndex: page,
    user,
  }), [page, user])

  return (
    <RegistrationFormContext.Provider value={providerValue}>
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
