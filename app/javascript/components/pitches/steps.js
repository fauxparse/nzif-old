import React from 'react'
import PropTypes from 'prop-types'
import Step from './step'
import { STEPS } from './constants'

const PitchSteps = ({ step = STEPS[0], onStepClick }) => {
  const index = STEPS.indexOf(step)

  return (
    <ol className="steps pitch__steps">
      {STEPS.map((step, i) => {
        const active = index === i
        const completed = index > i
        const nextStep = index === i - 1

        return (
          <Step
            key={step.name}
            active={active}
            completed={completed}
            nextStep={nextStep}
            {...step}
            onClick={() => onStepClick(step)}
          />
        )
      })}
    </ol>
  )
}

PitchSteps.propTypes = {
  step: PropTypes.oneOf(STEPS),
  onStepClick: PropTypes.func.isRequired,
}

export default PitchSteps
