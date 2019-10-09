import React from 'react'
import PropTypes from 'prop-types'
import { Errors, Field, Hint, Textarea, WordCount } from '../form'

const KidsPerformance = ({ pitch, errors, onChange }) => {
  const {
    name,
    showDescription,
    casting,
    castDetails,
    castRequirements,
    performedBefore,
    workshopDescription,
    taughtBefore,
    accessibility,
    otherInfo,
  } = pitch

  return (
    <>
      <h2 className="section-title pitch-section__title">Improv for young audiences</h2>
      <ul className="pitch__checklist">
        <li>
          Daytime performances during the second week of the school holidays
          (first week of the festival)
        </li>
        <li>
          40–50 minute performance for a black box theatre (the Random Stage at BATS)
        </li>
        <li>
          New or existing work specifically for primary aged children
        </li>
        <li>
          May consist of casts from existing companies, or an ensemble cast from festival
          participants
        </li>
        <li>
          May include an accompanying workshop
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

      <Field className="pitch__field">
        <p>
          How will you cast the show? Will you bring an existing ensemble,
          find a cast at the festival, or a mix of the two?
        </p>
        <Textarea
          value={casting}
          minRows={3}
          onChange={e => onChange('casting', e.target.value)}
        />
        <Errors from={errors} name="casting" />
      </Field>

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

      <h2 className="section-title pitch-section__title">Your workshop</h2>
      <p>
        <b>Note:</b> This section is only required if you plan to run an accompanying
        workshop to teach your show to new players.
      </p>
      <Field className="pitch__field">
        <p>
          Please describe the accompanying workshop.
          What are you hoping participants will get out of it?
          It should provide something of value to participants who do not perform in the show.
        </p>
        <WordCount
          value={workshopDescription}
          minRows={3}
          min={50}
          max={100}
          required
          onChange={e => onChange('workshopDescription', e.target.value)}
        />
        <Errors from={errors} name="workshopDescription" />
      </Field>

      <Field className="pitch__field">
        <p>Will you have taught this workshop prior to the Festival? If so, please give details:</p>
        <Textarea
          value={taughtBefore}
          minRows={3}
          onChange={e => onChange('taughtBefore', e.target.value)}
        />
        <Hint>
          Leave blank if you haven’t taught it before.
        </Hint>
        <Errors from={errors} name="taughtBefore" />
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
        <p>Anything else we should know about this show and workshop?</p>
        <Textarea
          value={otherInfo}
          minRows={3}
          onChange={e => onChange('otherInfo', e.target.value)}
        />
        <Hint>
          Feedback from previous participants;
          previous skills/training required;
          room requirements;
          specific accessibility notes (e.g. mobility, vision, hearing)
        </Hint>
        <Errors from={errors} name="otherInfo" />
      </Field>
    </>
  )
}

KidsPerformance.propTypes = {
  pitch: PropTypes.shape({
    name: PropTypes.string,
    showDescription: PropTypes.string,
    casting: PropTypes.string,
    castDetails: PropTypes.string,
    castRequirements: PropTypes.string,
    performedBefore: PropTypes.string,
    workshopDescription: PropTypes.string,
    taughtBefore: PropTypes.string,
    accessibility: PropTypes.string,
    otherInfo: PropTypes.string,
  }).isRequired,
  errors: PropTypes.object,
  onChange: PropTypes.func.isRequired,
}

export default KidsPerformance
