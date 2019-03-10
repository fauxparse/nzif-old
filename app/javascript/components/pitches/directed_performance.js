import React from 'react'
import PropTypes from 'prop-types'
import TextLink from '../shared/text_link'
import { Errors, Field, Hint, Input, Textarea, WordCount } from '../form'

const DirectedPerformance = ({ pitch, errors, onChange }) => {
  const {
    name,
    showDescription,
    castSize,
    performedBefore,
    workshopDescription,
    taughtBefore,
    otherInfo,
  } = pitch

  return (
    <>
      <h2 className="section-title pitch-section__title">Directed performance</h2>
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

      <p>
        <TextLink to="http://nzimprovfestival.co.nz/news/2018/6/5/ten-years-of-moments-nzif-2018">
          Check out this blog post
        </TextLink>
        {' '}
        for more about what we’re after (and what we can offer you).
      </p>

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
        <p>What is the ideal cast size?</p>
        <Input
          type="number"
          className="form__input--number"
          value={castSize}
          min={1}
          max={100}
          required
          onChange={e => onChange('castSize', e.target.value)}
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
  }).isRequired,
  errors: PropTypes.object,
  onChange: PropTypes.func.isRequired,
}

export default DirectedPerformance
