import React from 'react'
import PropTypes from 'prop-types'
import { Errors, Field, Hint, Input, Textarea, WordCount } from '../form'
import ActivityLevels from './levels'

const DirectedPerformance = ({ pitch, errors, onChange }) => {
  const {
    name,
    showDescription,
    showDetails,
    showWhy,
    showTech,
    castSize,
    participantCount,
    performedBefore,
    workshopDescription,
    workshopRequirements,
    workshopTech,
    taughtBefore,
    accessibility,
    otherInfo,
  } = pitch

  return (
    <>
      <h2 className="section-title pitch-section__title">New works</h2>
      <ul className="pitch__checklist">
        <li>
          50–75 minute performances for a black box theatre (the Heyday Dome or Random Stage at
          BATS) led by one or two directors
        </li>
        <li>
          Recently developed shows that have not been performed at NZIF previously, that would suit
          intermediate improvisors
        </li>
        <li>
          An accompanying workshop teaching participants the relevant skills and techniques needed
          (from which you will cast the performance)
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
          What is the promise of the show? i.e., how would you describe it to an audience?
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
          Now we’d like a little more behind-the-scenes detail.
          Describe the show in terms of the genre, the structure,
          what you’re trying to do, how it works.
        </p>
        <Textarea
          value={showDetails}
          minRows={3}
          onChange={e => onChange('showDetails', e.target.value)}
        />
        <Errors from={errors} name="showDetails" />
      </Field>

      <Field className="pitch__field">
        <p>
          Why should this show be seen at NZIF? 
        </p>
        <Textarea
          value={showWhy}
          minRows={3}
          onChange={e => onChange('showWhy', e.target.value)}
        />
        <Errors from={errors} name="showWhy" />
      </Field>

      <Field className="pitch__field">
        <p>Who is your show suitable for in terms of casting? Select as many as are applicable:</p>
        <ActivityLevels pitch={pitch} onChange={onChange} />
        <Errors from={errors} name="activityLevels" />
      </Field>

      <Field className="pitch__field">
        <p>
          What does this show require in terms of staging? Set, costume, music, lights etc? 
          Give us as much detail as you can at this stage.
        </p>
        <Textarea
          value={showTech}
          minRows={3}
          onChange={e => onChange('showTech', e.target.value)}
        />
        <Errors from={errors} name="showTech" />
      </Field>

      <Field className="pitch__field">
        <p>What is the ideal cast size?</p>
        <Input
          type="number"
          className="form__input--number"
          value={castSize}
          min={1}
          max={100}
          required
          onChange={e => onChange('castSize', parseInt(e.target.value, 10))}
        />
        <Hint>
          We will favour shows with at least 6–8 players
        </Hint>
        <Errors from={errors} name="castSize" />
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

      <h2 className="section-title pitch-section__title">Your workshop</h2>
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
        <p>What is the maximum number of participants?</p>
        <Input
          type="number"
          className="form__input--number"
          value={participantCount}
          min={6}
          max={100}
          required
          onChange={(e) =>
            onChange("participantCount", parseInt(e.target.value, 10))
          }
        />
        <Hint>
          We recommend 16 but are open to smaller or larger class sizes if
          appropriate for the content. Workshops will have a minimum of 6
          participants.
        </Hint>
        <Errors from={errors} name="participantCount" />
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

      <Field className="pitch__field">
        <p>Are there any other prerequisites for your workshop?</p>
        <Textarea
          value={workshopRequirements}
          minRows={3}
          required
          onChange={(e) => onChange("workshopRequirements", e.target.value)}
        />
        <Hint>
          Previous skills/training required; specific accessibility notes (e.g.
          mobility, vision, hearing)
        </Hint>
        <Errors from={errors} name="workshopRequirements" />
      </Field>

      <Field className="pitch__field">
        <p>Does your workshop have any space or equipment requirements?</p>
        <Textarea
          value={workshopTech}
          minRows={3}
          required
          onChange={(e) => onChange("workshopTech", e.target.value)}
        />
        <Hint>
          e.g. carpeted floor, sound system
        </Hint>
        <Errors from={errors} name="workshopTech" />
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
          required
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

DirectedPerformance.propTypes = {
  pitch: PropTypes.shape({
    name: PropTypes.string,
    showDescription: PropTypes.string,
    showDetails: PropTypes.string,
    showWhy: PropTypes.string,
    showTech: PropTypes.string,
    castSize: PropTypes.number,
    participantCount: PropTypes.number,
    performedBefore: PropTypes.string,
    workshopDescription: PropTypes.string,
    workshopRequirements: PropTypes.string,
    workshopTech: PropTypes.string,
    taughtBefore: PropTypes.string,
    accessibility: PropTypes.string,
    otherInfo: PropTypes.string,
  }).isRequired,
  errors: PropTypes.object,
  onChange: PropTypes.func.isRequired,
}

export default DirectedPerformance
