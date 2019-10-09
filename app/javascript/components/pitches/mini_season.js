import React from 'react'
import PropTypes from 'prop-types'
import { Errors, Field, Hint, Textarea, WordCount } from '../form'

const MiniSeason = ({ pitch, errors, onChange }) => {
  const {
    name,
    showDescription,
    performedBefore,
    castDetails,
    castRequirements,
    accessibility,
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

      <h2 className="section-title pitch-section__title">Your cast</h2>

      <Field className="pitch__field">
        <p>
          If you are bringing a cast, how many people will you bring, and what are their names?
        </p>
        <Textarea
          value={castDetails}
          minRows={3}
          onChange={e => onChange('castDetails', e.target.value)}
        />
        <Errors from={errors} name="cast_details" />
      </Field>

      <Field className="pitch__field">
        <p>
          Will you and/or your cast need accommodation?
        </p>
        <Textarea
          value={castRequirements}
          minRows={3}
          onChange={e => onChange('castRequirements', e.target.value)}
        />
        <Errors from={errors} name="cast_requirements" />
      </Field>

      <h2 className="section-title pitch-section__title">Other info</h2>

      <Field className="pitch__field">
        <p>Do you or any of your cast require accessibility assistance to participate at NZIF?</p>
        <Textarea
          value={accessibility}
          minRows={3}
          required
          onChange={e => onChange('accessibility', e.target.value)}
        />
        <Hint>
          e.g. travel assistance, childcare, physical access?
        </Hint>
        <Errors from={errors} name="accessibility" />
      </Field>

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
    showDescription: PropTypes.string,
    performedBefore: PropTypes.string,
    castDetails: PropTypes.string,
    castRequirements: PropTypes.string,
    accessibility: PropTypes.string,
    otherInfo: PropTypes.string,
  }).isRequired,
  errors: PropTypes.object,
  onChange: PropTypes.func.isRequired,
}

export default MiniSeason
