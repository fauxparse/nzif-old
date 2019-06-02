import React from 'react'
import PropTypes from 'prop-types'
import { Errors, Field, Hint, Textarea, WordCount } from '../form'

const MiniSeason = ({ pitch, errors, onChange }) => {
  const {
    name,
    showDescription,
    performedBefore,
    otherInfo,
  } = pitch

  return (
    <>
      <h2 className="section-title pitch-section__title">Mini season</h2>
      <ul className="pitch__checklist">
        <li>2–3 night season during the Festival</li>
        <li>
          50–75 minute performances for a black box theatre (the Random Stage at BATS)
        </li>
        <li>
          New or existing work from established companies or ensembles around New Zealand
        </li>
      </ul>

      <h2 className="section-title pitch-section__title">Your show</h2>
      <Field className="pitch__field">
        <p>What is the name of your show?</p>
        <Textarea
          value={name}
          minRows={1}
          required
          onChange={e => onChange('name', e.target.value)}
        />
        <Errors from={errors} name="name" />
      </Field>

      <Field className="pitch__field">
        <p>
          Please describe the show you wish to direct. Just describe the show and how it works:
          this is not the marketing blurb
        </p>
        <WordCount
          value={showDescription}
          minRows={3}
          min={50}
          max={100}
          required
          onChange={e => onChange('showDescription', e.target.value)}
        />
        <Errors from={errors} name="showDescription" />
      </Field>

      <Field className="pitch__field">
        <p>
          Will you have directed or performed this show/format prior to the Festival?
          If so, please give details (quotes or links to reviews are helpful here if you have them)
        </p>
        <Textarea
          value={performedBefore}
          minRows={3}
          onChange={e => onChange('performedBefore', e.target.value)}
        />
        <Errors from={errors} name="performedBefore" />
      </Field>

      <h2 className="section-title pitch-section__title">Other info</h2>

      <Field className="pitch__field">
        <p>Anything else we should know about this show?</p>
        <Textarea
          value={otherInfo}
          minRows={3}
          required
          onChange={e => onChange('otherInfo', e.target.value)}
        />
        <Hint>
          Technical requirements (A/V, set, etc);
          content notes;
          specific accessibility notes (e.g. mobility, vision, hearing)
        </Hint>
        <Errors from={errors} name="otherInfo" />
      </Field>
    </>
  )
}

MiniSeason.propTypes = {
  pitch: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  errors: PropTypes.object,
  onChange: PropTypes.func.isRequired,
}

export default MiniSeason
