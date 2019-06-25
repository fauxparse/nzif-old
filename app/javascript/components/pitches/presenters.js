import React from 'react'
import PropTypes from 'prop-types'
import Presenter from './presenter'
import Button from '../button'
import Link from '../shared/text_link'
import Icon from '../../atoms/icon';
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
    const newPresenters = presenters.slice(0)
    newPresenters.splice(index, 1)
    onChange('presenters', newPresenters)
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
      {errors && errors.user && (
        <p className="pitch__error">
          <Icon name="error" />
          <span>
            Sorry, doesn’t look like that password was correct.{' '}
            <Link to="/password/forgot">
              Did you forget your password?
            </Link>
          </span>
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

      <h2 className="section-title pitch-section__title">Code of conduct</h2>
      <Field className="pitch__field">
        <p>
          We ask all participants to adhere to the
          Festival’s <Link external to="/code-of-conduct">Code of Conduct</Link>.
          Please take a moment now to familiarise yourself with the Code now,
          even if you’ve been to NZIF before.
        </p>
        <Checkbox
          checked={!!codeOfConduct}
          onChange={e => onChange('codeOfConduct', e.target.checked)}
        >
          <div>
            I agree to abide by
            the <Link external to="/code-of-conduct">NZIF Code of Conduct</Link>
          </div>
          <Errors from={errors} name="codeOfConduct" />
        </Checkbox>
      </Field>
    </section>
  )
}

Presenters.propTypes = {
  pitch: PropTypes.shape({
    presenters: PropTypes.array,
  }).isRequired,
  errors: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Presenters
