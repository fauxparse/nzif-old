import React, { useCallback, useMemo } from 'react'
import validate from 'validate.js'
import PropTypes from 'lib/proptypes'
import { useSticky } from 'lib/hooks'
import Stepper from 'molecules/stepper'
import { useRegistration } from 'contexts/registration'
import PAGES from './pages'

const Header = ({ pageIndex, onStepClick }) => {
  const { registration } = useRegistration()

  const ref = useSticky()

  const stepClicked = useCallback((e) => {
    onStepClick(PAGES[parseInt(e.target.closest('.step').dataset.page, 10)])
  }, [onStepClick])

  const valid = useMemo(() => {
    const validated = PAGES.map(({ validations }) => !validate(registration, validations))
    return validated.map((_, i) => validated.slice(0, i).every(Boolean))
  }, [registration])

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
            data-page={i}
            disabled={!valid[i]}
            onClick={stepClicked}
          />
        ))}
      </Stepper>
    </header>
  )
}

Header.propTypes = {
  pageIndex: PropTypes.number.isRequired,
  onStepClick: PropTypes.func.isRequired,
}

export default Header
