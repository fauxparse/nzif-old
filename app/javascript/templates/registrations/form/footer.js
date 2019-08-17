import React, { useContext } from 'react'
import Button from 'atoms/button'
import PAGES from './pages'
import RegistrationFormContext from './context'

const Footer = ({ onBackClick, onNextClick }) => {
  const { pageIndex } = useContext(RegistrationFormContext)

  return (
    <footer className="registration-form__footer">
      <div />
      <div className="footer__buttons">
        {pageIndex > 0 && (
          <Button text="Back" onClick={onBackClick} />
        )}
        {pageIndex < PAGES.length - 1 && (
          <Button primary text="Next" onClick={onNextClick} />
        )}
        {pageIndex === PAGES.length - 1 && (
          <Button primary text="Finish" onClick={onNextClick} />
        )}
      </div>
    </footer>
  )
}

export default Footer
