import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import dotProp from 'dot-prop-immutable'
import PitchSteps from './steps'
import { STEPS } from './constants'
import PageTransition, { slideLeft, slideRight, none } from '../page_transition'
import Button from '../button'
import Loader from '../shared/loader'

const useNestedState = (initialValue) => {
  const [state, setState] = useState(initialValue)
  const update = (path, value) => setState(dotProp.set(state, path, value))
  return [state, setState, update]
}

const PitchForm = ({ pitch, errors, onSave }) => {
  const [step, setStep] = useState(STEPS[0])
  const [previousStep, setPreviousStep] = useState(STEPS[0])
  const goToStep = newStep => {
    setPreviousStep(step)
    setStep(newStep)
  }
  const StepComponent = step.controller
  const previousIndex = STEPS.indexOf(previousStep)
  const index = STEPS.indexOf(step)
  const transition =
    index < previousIndex
      ? slideRight
      : index > previousIndex
        ? slideLeft
        : none

  const [state, setState, valueChanged] = useNestedState(pitch)
  useEffect(() => setState(pitch), [setState, pitch])

  const [saving, setSaving] = useState(false)

  const save = (callback) => {
    setSaving(true)
    return Promise.all([
      new Promise(resolve => setTimeout(resolve, 1000)),
      onSave(state)
    ]).then(callback).finally(() => setSaving(false))
  }

  const saveAndGoToStep = step => save(() => goToStep(step))

  const submit = e => e && e.preventDefault() || saveAndGoToStep(STEPS[index + 1])

  return (
    <form className="pitch__form" onSubmit={submit} disabled={saving}>
      <PitchSteps step={step} onStepClick={saveAndGoToStep} />

      <div className="pitch__step-contents">
        <PageTransition {...transition} pageKey={step.name}>
          {StepComponent && (
            <StepComponent pitch={state} errors={errors} onChange={valueChanged} />
          )}
        </PageTransition>
      </div>

      <Loader />

      <Button primary type="submit" text="Next" />
    </form>
  )
}

PitchForm.propTypes = {
  pitch: PropTypes.shape({}).isRequired,
  errors: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
}

PitchForm.defaultProps = {
  errors: {},
}

export default PitchForm
