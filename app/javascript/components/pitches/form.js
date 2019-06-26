import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactRouterPropTypes from 'react-router-prop-types'
import dotProp from 'dot-prop-immutable'
import { withRouter } from 'react-router-dom'
import PitchSteps from './steps'
import { STEPS } from './constants'
import PageTransition, { slideLeft, slideRight } from '../page_transition'
import Button from '../../atoms/button'
import Loader from '../shared/loader'

const useNestedState = initialValue => {
  const [state, setState] = useState(initialValue)
  const update = (path, value) => setState(dotProp.set(state, path, value))
  return [state, setState, update]
}

const PitchForm = ({ location, history, pitch, errors, onSave, onClose }) => {
  const step =
    STEPS.find(step => location.hash === `#${step.name}`) || STEPS[0]
  const index = STEPS.indexOf(step)
  const finalStep = index === STEPS.length - 1
  const transition = (location.state && location.state.transition) || slideLeft
  const StepComponent = step.controller

  const [saving, setSaving] = useState(false)
  const [state, setState, valueChanged] = useNestedState(pitch)
  useEffect(() => setState(pitch), [setState, pitch])

  const save = (newLocation, { replace = false, extras = {} } = {}) => {
    setSaving(true)
    onSave({ ...state, ...extras }, newLocation)
      .then(location => {
        setSaving(false)
        history[replace ? 'replace' : 'push'](location)
      })
      .catch(() => setSaving(false))
  }

  const saveAndGoToStep = (newStep) => {
    const newIndex = STEPS.indexOf(newStep)
    const transition = newIndex < index ? slideRight : slideLeft
    save(
      { ...location, hash: `#${newStep.name}`, state: { transition } },
      { replace: true }
    )
  }

  const goBack = (e) => {
    e && e.preventDefault()
    saveAndGoToStep(STEPS[index - 1])
  }

  const saveForLater = e => {
    e && e.preventDefault()
    save({ ...location, pathname: location.pathname.replace(/\/[^/]+$/, '') })
  }

  const submit = e => {
    e && e.preventDefault()
    if (finalStep) {
      save(
        { ...location, pathname: location.pathname.replace(/\/[^/]+$/, '') },
        { extras: { state: finalStep ? 'submitted' : pitch.state } }
      )
    } else {
      saveAndGoToStep(STEPS[index + 1])
    }
  }

  return (
    <form className="pitch__form" onSubmit={submit} disabled={saving}>
      <PitchSteps step={step} onStepClick={saveAndGoToStep} />

      <div className="pitch__step-contents">
        <PageTransition {...transition} pageKey={step.name}>
          {StepComponent && (
            <StepComponent
              pitch={state}
              errors={errors}
              onChange={valueChanged}
            />
          )}
        </PageTransition>
      </div>

      <Loader />

      <footer className="pitch__buttons">
        {finalStep ? (
          <Button primary type="submit" icon="send" text="Submit my pitch" />
        ) : (
          <Button
            primary
            type="submit"
            icon="arrow-right"
            text={`Next: ${STEPS[index + 1].title}`}
          />
        )}
        {index > 0 && <Button type="submit" icon="arrow-left" text="Go back" onClick={goBack} />}
        {onClose && (
          <Button icon="clock" text="Save for later" onClick={saveForLater} />
        )}
      </footer>
    </form>
  )
}

PitchForm.propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
  pitch: PropTypes.shape({}).isRequired,
  errors: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func,
}

PitchForm.defaultProps = {
  errors: {},
}

export default withRouter(PitchForm)
