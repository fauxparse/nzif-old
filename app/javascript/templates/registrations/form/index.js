import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import IntermittentLoader from 'molecules/intermittent_loader'
import Header from './header'
import Pager from './pager'
import Footer from './footer'
import PAGES from './pages'
import { useRegistration } from 'contexts/registration'

import './index.scss'

const RegistrationForm = ({ festival, page: initialPage, onPageChange }) => {
  const { loading, saving, save } = useRegistration()

  const container = useRef()

  const [page, setPage] = useState(PAGES.indexOf(initialPage))

  const scrollTop = useRef(0)

  const goToPage = useCallback((page) => {
    scrollTop.current = document.documentElement.scrollTop
    setPage(page)
  }, [scrollTop, setPage])

  const stepClicked = useCallback((page) => {
    goToPage(PAGES.indexOf(page))
  }, [goToPage])

  const previousPage = useCallback(() => {
    goToPage(page - 1)
  }, [page, goToPage])

  const nextPage = useCallback(() => {
    save().then(() => goToPage(page + 1)).catch(() => {})
  }, [save, page, goToPage])

  const Component = useMemo(() => PAGES[page].component, [page])

  useEffect(() => {
    if (onPageChange) {
      onPageChange(PAGES[page])
    }
  }, [onPageChange, page])

  React.useLayoutEffect(() => {
    if (!container.current) return
    const pager = container.current.querySelector('.registration-form__pager')
    const header = container.current.querySelector('.registration-form__header')
    const maxScrollTop = pager.getBoundingClientRect().y + scrollTop.current - header.offsetHeight
    document.documentElement.scrollTop = Math.min(scrollTop.current, maxScrollTop)
  }, [page])

  const busy = loading || saving

  return (
    <section
      ref={container}
      className={classNames('registration-form', busy && 'registration-form--busy')}
    >
      <h1 className="registration-form__title">Register for NZIF {festival.year}</h1>
      <Header pageIndex={page} onStepClick={stepClicked} />
      <Pager pageIndex={page}>
        {!loading && (
          <Component />
        )}
      </Pager>
      <Footer
        pageIndex={page}
        onBackClick={previousPage}
        onNextClick={nextPage}
      />
      <IntermittentLoader loading={busy} />
    </section>
  )
}

RegistrationForm.propTypes = {
  festival: PropTypes.shape({
    year: PropTypes.id.isRequired,
  }).isRequired,
  page: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  onPageChange: PropTypes.func,
}

RegistrationForm.defaultProps = {
  page: PAGES[0],
  onPageChange: null,
}

export default RegistrationForm
