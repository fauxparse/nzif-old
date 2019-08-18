import React, { useContext } from 'react'
import { useSticky } from 'lib/hooks'
import Stepper from 'molecules/stepper'
import PAGES from './pages'
import RegistrationFormContext from './context'

const Header = () => {
  const ref = useSticky()

  const { pageIndex } = useContext(RegistrationFormContext)

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

export default Header
