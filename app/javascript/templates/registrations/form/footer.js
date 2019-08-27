import React, { Fragment, useMemo } from 'react'
import validate from 'validate.js'
import isEmpty from 'lodash/isEmpty'
import PropTypes from 'lib/proptypes'
import Button from 'atoms/button'
import { useRegistration } from 'contexts/registration'
import PAGES from './pages'
import Cart from './cart'

const Footer = ({ pageIndex, onBackClick, onNextClick }) => {
  const { loading, saving, registration } = useRegistration()

  const valid = useMemo(() => {
    const errors = validate(registration, PAGES[pageIndex].validations || {})
    return isEmpty(errors)
  }, [registration, pageIndex])

  const busy = loading || saving

  return (
    <footer className="registration-form__footer">
      <Cart />
      <div className="footer__buttons">
        {pageIndex < PAGES.length - 1 && (
          <Fragment>
            {pageIndex > 0 && (
              <Button text="Back" disabled={busy} onClick={onBackClick} />
            )}
            <Button
              primary
              disabled={busy || !valid}
              text={pageIndex < PAGES.length - 2 ? 'Next' : 'Finish'}
              onClick={onNextClick}
            />
          </Fragment>
        )}
      </div>
    </footer>
  )
}

Footer.propTypes = {
  pageIndex: PropTypes.number.isRequired,
  onBackClick: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired,
}

export default Footer
