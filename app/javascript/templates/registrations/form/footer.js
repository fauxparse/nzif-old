import React from 'react'
import PropTypes from 'lib/proptypes'
import Button from 'atoms/button'
import { useRegistration } from 'contexts/registration'
import PAGES from './pages'
import Cart from './cart'

const Footer = ({ pageIndex, onBackClick, onNextClick }) => {
  const { valid, loading, saving } = useRegistration()

  const busy = loading || saving

  return (
    <footer className="registration-form__footer">
      <Cart />
      <div className="footer__buttons">
        {pageIndex > 0 && (
          <Button text="Back" disabled={busy} onClick={onBackClick} />
        )}
        <Button
          primary
          disabled={busy || !valid}
          text={pageIndex < PAGES.length - 1 ? 'Next' : 'Finish'}
          onClick={onNextClick}
        />
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
