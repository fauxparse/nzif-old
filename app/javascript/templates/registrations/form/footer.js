import React, { useContext, useMemo } from 'react'
import PropTypes from 'lib/proptypes'
import Button from 'atoms/button'
import PAGES from './pages'
import RegistrationFormContext from './context'

const Footer = ({ valid, onBackClick, onNextClick }) => {
  const { pageIndex, registration: { workshops } } = useContext(RegistrationFormContext)

  const workshopCount = useMemo(() => workshops.filter(([_, p]) => p === 1).length, [workshops])

  return (
    <footer className="registration-form__footer">
      <div className="footer__cart">
        {workshopCount} {workshopCount === 1 ? 'workshop' : 'workshops'}
      </div>
      <div className="footer__buttons">
        {pageIndex > 0 && (
          <Button text="Back" onClick={onBackClick} />
        )}
        {pageIndex < PAGES.length - 1 && (
          <Button primary disabled={!valid} text="Next" onClick={onNextClick} />
        )}
        {pageIndex === PAGES.length - 1 && (
          <Button primary disabled={!valid} text="Finish" onClick={onNextClick} />
        )}
      </div>
    </footer>
  )
}

Footer.propTypes = {
  valid: PropTypes.bool.isRequired,
  onBackClick: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired,
}

export default Footer
