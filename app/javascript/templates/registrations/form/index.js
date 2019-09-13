import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import Helmet from 'react-helmet'
import IntermittentLoader from 'molecules/intermittent_loader'
import Header from './header'
import Pager from './pager'
import Footer from './footer'
import PAGES from './pages'
import RegistrationPaused from './registration_paused'
import { useRegistration } from 'contexts/registration'

import './index.scss'

const RegistrationForm = ({ festival, page, onPageChange }) => {
  const { loading, saving, save } = useRegistration()

  const container = useRef()

  const [pageIndex, setPageIndex] = useState(PAGES.indexOf(page))

  const scrollTop = useRef(0)

  const goToPage = useCallback((index) => {
    scrollTop.current = document.documentElement.scrollTop
    setPageIndex(index)
  }, [scrollTop, setPageIndex])

  const stepClicked = useCallback((page) => {
    goToPage(PAGES.indexOf(page))
  }, [goToPage])

  const previousPage = useCallback(() => {
    goToPage(pageIndex - 1)
  }, [pageIndex, goToPage])

  const nextPage = useCallback(() => {
    save().then(() => goToPage(pageIndex + 1)).catch(() => {})
  }, [save, pageIndex, goToPage])

  const Component = useMemo(() => PAGES[pageIndex].component, [pageIndex])

  useEffect(() => {
    if (onPageChange) {
      onPageChange(PAGES[pageIndex])
    }
  }, [onPageChange, pageIndex])

  React.useLayoutEffect(() => {
    if (!container.current) return
    const pager = container.current.querySelector('.registration-form__pager')
    const header = container.current.querySelector('.registration-form__header')
    if (!pager || !header) return

    const maxScrollTop = pager.getBoundingClientRect().y + scrollTop.current - header.offsetHeight
    document.documentElement.scrollTop = Math.min(scrollTop.current, maxScrollTop)
  }, [page])

  const busy = loading || saving

  if (festival && festival.state === 'allocating') {
    return <RegistrationPaused />
  }

  return (
    <section
      ref={container}
      className={classNames('registration-form', busy && 'registration-form--busy')}
    >
      <Helmet>
        <title>{`Register for NZIF ${festival.year}`}</title>
      </Helmet>
      <h1 className="registration-form__title">Register for NZIF {festival.year}</h1>
      <Header pageIndex={pageIndex} onStepClick={stepClicked} />
      <Pager pageIndex={pageIndex}>
        {!loading && (
          <Component />
        )}
      </Pager>
      <Footer
        pageIndex={pageIndex}
        onBackClick={previousPage}
        onNextClick={nextPage}
      />
      <IntermittentLoader loading={busy} />
    </section>
  )
}

RegistrationForm.propTypes = {
  festival: PropTypes.festival.isRequired,
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
