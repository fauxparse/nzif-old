import React from 'react'
import PropTypes from 'prop-types'
import Presenter from './presenter'
import Button from '../button'
import Link from '../shared/text_link'
import Date from '../shared/date'
import { Checkbox, Errors, Field, Hint, Textarea, WordCount } from '../form'

const Presenters = ({ pitch, errors, onChange }) => {
  const {
    festival,
    presenters,
    company,
    bio,
    presentedBefore,
    availability,
    codeOfConduct,
  } = pitch

  const presenterChanged = (index, presenter) => {
    onChange(`presenters.${index}`, presenter)
  }

  const addPresenter = () => onChange('presenters', [...presenters, {}])

  const deletePresenter = index => {
    onChange('presenters', presenters.splice(index, 1))
  }

  return (
    <section className="pitch-section pitch-section--presenters">
      <h2 className="section-title pitch-section__title">About you</h2>
      <p>
        Tell us about yourself! If multiple people are pitching, please list
        each presenter separately.
      </p>
      {!presenters[0].id && (
        <p>
          If you already have an account, you can{' '}
          <Link to="/login">log in</Link>.
        </p>
      )}
      <div className="pitch__presenters">
        {presenters.map((presenter, index) => (
          <Presenter
            key={index}
            presenter={presenter}
            disabled={!!presenter.id}
            passwordRequired={!index && !presenter.id}
            onChange={presenter => presenterChanged(index, presenter)}
            onDelete={() => deletePresenter(index)}
          />
        ))}
        <Button
          className="pitch__presenter pitch__add-presenter"
          icon="add"
          text="Add another presenter"
          onClick={e => e.preventDefault() || addPresenter()}
        />
      </div>

      <h2 className="section-title pitch-section__title">
        Company information
      </h2>
      <Field className="pitch__field">
        <p>What is the name of the company presenting the work?</p>
        <Textarea
          value={company}
          minRows={1}
          onChange={e => onChange('company', e.target.value)}
        />
        <Hint>Leave blank if you’re applying as an individual.</Hint>
        <Errors from={errors} name="company" />
      </Field>

      <Field className="pitch__field">
        <p>
          Please provide a brief bio: something we could publish when promoting
          your show.
        </p>
        <WordCount
          value={bio}
          minRows={3}
          min={50}
          max={100}
          onChange={e => onChange('bio', e.target.value)}
        />
        <Errors from={errors} name="bio" />
      </Field>

      <Field className="pitch__field">
        <p>
          Have you or your company presented at NZIF before? If so, tell us
          about it!
        </p>
        <Textarea
          value={presentedBefore}
          minRows={3}
          onChange={e => onChange('presentedBefore', e.target.value)}
        />
        <Hint>Leave blank if this is your first time.</Hint>
        <Errors from={errors} name="presentedBefore" />
      </Field>

      <Field className="pitch__field">
        <p>
          Do you plan to be in Wellington for all of NZIF, or are there
          restrictions on when you can participate?
        </p>
        <Textarea
          value={availability}
          minRows={3}
          onChange={e => onChange('availability', e.target.value)}
        />
        {festival && (
          <Hint>
            Festival dates are{' '}
            <Date date={[festival.startDate, festival.endDate]} />.
          </Hint>
        )}
        <Errors from={errors} name="availability" />
      </Field>

      <h2 className="section-title pitch-section__title">Code of conduct</h2>
      <Field className="pitch__field">
        <p>
          We ask all participants to adhere to the Festival’s Code of Conduct.
          Please take a moment now to familiarise yourself with the Code now,
          even if you’ve been to NZIF before.
        </p>
        <Checkbox
          checked={!!codeOfConduct}
          onChange={e => onChange('codeOfConduct', e.target.checked)}
        >
          <div>I agree to abide by the NZIF Code of Conduct</div>
          <Errors from={errors} name="codeOfConduct" />
        </Checkbox>
      </Field>
    </section>
  )
}

Presenters.propTypes = {
  pitch: PropTypes.shape({
    presenters: PropTypes.array.isRequired
  }).isRequired,
  errors: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Presenters
