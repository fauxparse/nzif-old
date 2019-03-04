import React, { useState } from 'react'
import dotProp from 'dot-prop-immutable'
import PitchSteps from './steps'
import { STEPS } from './constants'
import PageTransition, { slideLeft, slideRight, none } from '../page_transition'

const useNestedState = (initialValue) => {
  const [state, setState] = useState(initialValue)
  const update = (path, value) => setState(dotProp.set(state, path, value))
  return [state, update]
}

const PitchForm = ({ festival, user }) => {
  const [step, setStep] = useState(STEPS[0])
  const [previousStep, setPreviousStep] = useState(STEPS[0])
  const goToStep = (newStep) => {
    setPreviousStep(step)
    setStep(newStep)
  }
  const StepComponent = step.controller
  const previousIndex = STEPS.indexOf(previousStep)
  const index = STEPS.indexOf(step)
  const transition = index < previousIndex ? slideRight : (index > previousIndex ? slideLeft : none)

  const [pitch, valueChanged] = useNestedState({
    festival,
    presenters: [user || {}],
    company: '',
    bio: '',
    presentedBefore: '',
    availability: '',
    codeOfConductAccepted: false,
  })

  return (
    <form>
      <PitchSteps step={step} onStepClick={goToStep} />

      <div className="pitch-form">
        <PageTransition {...transition} pageKey={step.name}>
          {StepComponent && <StepComponent pitch={pitch} onChange={valueChanged} />}
        </PageTransition>
      </div>
    </form>
  )
}

export default PitchForm
