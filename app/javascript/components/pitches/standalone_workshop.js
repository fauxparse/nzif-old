import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox, Errors, Field, Hint, Input, Textarea, WordCount } from '../form'
import ActivityLevels from './levels'

const StandaloneWorkshop = ({ pitch, errors, onChange }) => {
  const {
    name,
    workshopDescription,
    workshopRequirements,
    participantCount,
    taughtBefore,
    teens,
    accessibility,
    otherInfo,
  } = pitch

  return (
    <>
      <h2 className="section-title pitch-section__title">Standalone workshop</h2>
      <p>Well-structured workshops with clear aims and outcomes, offering one of the following:</p>

      <ul className="pitch__checklist">
        <li>Targeted scene work or skill development</li>
        <li>New approaches to improvisation</li>
        <li>Associated performance or presentation skills: mime, dance, scenography, other</li>
        <li>Company specific expertise in a shareable form</li>
        <li>Something new we haven’t thought of!</li>
      </ul>

      <h2 className="section-title pitch-section__title">Your workshop</h2>
      <Field className="pitch__field">
        <p>What is the name of your workshop?</p>
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
          Please describe the workshop you wish to teach: something we would publish to advertise
          your workshop. What are you covering? Why is it useful? Who would find it most relevant?
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
        <p>Who is your workshop aimed at? Select as many as are applicable:</p>
        <ActivityLevels pitch={pitch} onChange={onChange} />
        <Errors from={errors} name="activityLevels" />
      </Field>

      <Field className="pitch__field">
        <p>Are there any other prerequisites for your workshop?</p>
        <Textarea
          value={workshopRequirements}
          minRows={3}
          required
          onChange={e => onChange('workshopRequirements', e.target.value)}
        />
        <Hint>
          Previous skills/training required;
          specific accessibility notes (e.g. mobility, vision, hearing)
        </Hint>
        <Errors from={errors} name="workshopRequirements" />
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
          onChange={e => onChange('participantCount', parseInt(e.target.value, 10))}
        />
        <Hint>
          We recommend 16 but are open to smaller or larger class sizes if appropriate for the
          content. Workshops will have a minimum of 6 participants.
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
        <p>Would you be able to teach this workshop to teens during 7–9 October?</p>
        <Checkbox
          checked={!!teens}
          onChange={e => onChange('teens', e.target.checked)}
        >
          <div>
            Sure, that sounds great!
          </div>
          <Errors from={errors} name="teens" />
        </Checkbox>
      </Field>

      <Field className="pitch__field">
        <p>
          Do you or any of your teachers require accessibility assistance to participate at NZIF?
        </p>
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
        <p>Anything else we should know?</p>
        <Textarea
          value={otherInfo}
          minRows={3}
          onChange={e => onChange('otherInfo', e.target.value)}
        />
        <Hint>
          Feedback from previous participants, room requirements, etc.
        </Hint>
        <Errors from={errors} name="otherInfo" />
      </Field>
    </>
  )
}

StandaloneWorkshop.propTypes = {
  pitch: PropTypes.shape({
    name: PropTypes.string,
    workshopDescription: PropTypes.string,
    workshopRequirements: PropTypes.string,
    participantCount: PropTypes.number,
    taughtBefore: PropTypes.string,
    otherInfo: PropTypes.string,
    teens: PropTypes.bool,
    accessibility: PropTypes.string,
  }).isRequired,
  errors: PropTypes.object,
  onChange: PropTypes.func.isRequired,
}

export default StandaloneWorkshop
