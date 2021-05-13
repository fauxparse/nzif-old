import React from 'react'
import PropTypes from 'prop-types'
import Presenter from './presenter'
import Button from '../../atoms/button'
import Link from 'atoms/text_link'
import Icon from '../../atoms/icon';
import { Checkbox, Errors, Field, Hint, Textarea, WordCount } from '../form'

const AGREEMENTS = [
  {
    id: 'nzBased',
    label: 'I understand that teachers and directors for NZIF 2021 will be selected from NZ and Australian practitioners and make my submission accordingly',
  },
  {
    id: 'payment',
    label: 'I understand that as a teacher at NZIF I will receive: $200 per 3 hour workshop, accommodation for my time in Wellington if I don’t already live there, and a festival pass which gives me access to all social and conference events as well as standby tickets to shows, discounts at the bar, and additional perks to be advised.',
  },
  {
    id: 'transport',
    label: 'I understand that I am responsible for getting myself to Wellington for the duration of the festival (and that the festival will get me from the airport to accommodation!)',
  },
  {
    id: 'expenses',
    label: 'I understand that any workshops or performances I wish to attend are at my own expense and I will register at the earliest opportunity',
  },
  {
    id: 'codeOfConduct',
    label: (
      <>
        I have read, understand, and agree to the
        {' '}
        <Link external to="/code-of-conduct">Code of Conduct for 2021</Link>
        , and agree that if programmed I will assist the festival in maintaining it
        in my teaching and directing.
      </>
    ),
  },
]

const Presenters = ({ pitch, errors, onChange }) => {
  const {
    presenters,
    company,
    bio,
    presentedBefore,
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
          If you already have an account, you can{" "}
          <Link to="/login">log in</Link>.
        </p>
      )}
      {errors && errors.user && (
        <p className="pitch__error">
          <Icon name="error" />
          <span>
            Sorry, doesn’t look like that password was correct.{" "}
            <Link to="/password/forgot">Did you forget your password?</Link>
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
            onChange={(presenter) => presenterChanged(index, presenter)}
            onDelete={() => deletePresenter(index)}
          />
        ))}
        <Button
          className="pitch__presenter pitch__add-presenter"
          icon="add"
          text="Add another presenter"
          onClick={(e) => e.preventDefault() || addPresenter()}
        />
      </div>

      <Field className="pitch__field">
        <p>
          Please provide a brief professional bio: something we could publish
          when promoting your show.
        </p>
        <WordCount
          value={bio}
          minRows={3}
          min={50}
          max={100}
          onChange={(e) => onChange("bio", e.target.value)}
        />
        <Errors from={errors} name="bio" />
      </Field>

      <h2 className="section-title pitch-section__title">
        Company information
      </h2>
      <Field className="pitch__field">
        <p>
          Are you pitching a workshop or show affiliated with a particular
          company? If so, please tell us about that company!
        </p>
        <Textarea
          value={company}
          minRows={1}
          onChange={(e) => onChange("company", e.target.value)}
        />
        <Hint>Leave blank if you’re applying as an individual.</Hint>
        <Errors from={errors} name="company" />
      </Field>

      <Field className="pitch__field">
        <p>
          Have you or your company presented at NZIF before? If so, tell us
          about it!
        </p>
        <Textarea
          value={presentedBefore}
          minRows={3}
          onChange={(e) => onChange("presentedBefore", e.target.value)}
        />
        <Hint>Leave blank if this is your first time.</Hint>
        <Errors from={errors} name="presentedBefore" />
      </Field>

      <h2 className="section-title pitch-section__title">
        Before you continue
      </h2>
      <ul className="checklist">
        {AGREEMENTS.map(({ id, label }) => (
          <li key={id}>
            <Checkbox
              required
              checked={pitch[id] || false}
              onChange={(e) => onChange(id, e.target.checked)}
            >
              {label}
            </Checkbox>
          </li>
        ))}
      </ul>
    </section>
  );
}

Presenters.propTypes = {
  pitch: PropTypes.shape({
    presenters: PropTypes.array,
    company: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    presentedBefore: PropTypes.string.isRequired,
    codeOfConduct: PropTypes.bool.isRequired,
  }).isRequired,
  errors: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Presenters
