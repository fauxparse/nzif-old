import React from 'react'
import PropTypes from 'lib/proptypes'
import { useSticky } from 'lib/hooks'
import Stepper from 'molecules/stepper'
import PAGES from './pages'

const Header = ({ pageIndex }) => {
  const ref = useSticky()

  return (
    <header ref={ref} className="registration-form__header">
      <Stepper className="registration-form__stepper">
        {PAGES.map((page, i) => (
          <Stepper.Step
            key={page.name}
            icon={page.icon}
            text={page.label}
            current={pageIndex === i}
            completed={pageIndex > i}
          />
        ))}
      </Stepper>
    </header>
  )
}

Header.propTypes = {
  pageIndex: PropTypes.number.isRequired,
}

export default Header
