import React, { Fragment, useState, useCallback } from 'react'
import PropTypes from 'lib/proptypes'
import moment from 'lib/moment'
import Button from 'atoms/button'
import Date from 'atoms/date'
import Loader from 'atoms/loader'
import Sentence from 'atoms/sentence'
import TextLink from 'atoms/text_link'
import Breadcrumbs from 'molecules/breadcrumbs'
import LabelledField from 'molecules/labelled_field'
import Likert from 'molecules/likert'
import Header from 'organisms/header'

import './index.scss'

const Survey = ({ session, loading, sending, sent, onSend }) => {
  const [expectations, setExpectations] = useState()

  const [difficulty, setDifficulty] = useState()

  const [good, setGood] = useState('')

  const [bad, setBad] = useState('')

  const [testimonial, setTestimonial] = useState('')

  const goodChanged = useCallback(e => setGood(e.target.value), [setGood])

  const badChanged = useCallback(e => setBad(e.target.value), [setBad])

  const testimonialChanged = useCallback(e => setTestimonial(e.target.value), [setTestimonial])

  if (loading) return <Loader />

  const { presenters, levels } = session.activity

  const back = `/${moment(session.startsAt).year()}`

  const thisTeacher = presenters && presenters.length > 1 ? 'these teachers' : 'this teacher'

  const send = useCallback(() => {
    onSend({ expectations, difficulty, good, bad, testimonial })
  }, [expectations, difficulty, good, bad, testimonial, onSend])

  return (
    <section className="workshop-survey">
      <Header colored>
        <Breadcrumbs back={back}>
          <Breadcrumbs.Link to={back}>Festival home</Breadcrumbs.Link>
        </Breadcrumbs>
        <Header.Title>
          Participant survey
        </Header.Title>
        <h2 className="workshop-survey__name">
          {session.activity.name}
          {' with '}
          <Sentence>
            {presenters.map(u => u.name)}
          </Sentence>
        </h2>
        <h3 className="workshop-survey__date">
          <Date date={session.startsAt} />
        </h3>
      </Header>
      <div className="workshop-survey__body">
        {sent ? (
          <div className="workshop-survey__sent">
            <p>
              Thanks for your feedback! If you thing of anything else,
              you can always email Jen
              at <TextLink to="mailto:jen@improvfest.nz">jen@improvfest.nz</TextLink>.
            </p>
          </div>
        ) : (
          <Fragment>
            <div className="workshop-survey__introduction static-content">
              <p>
                Thanks for taking a workshop at NZIF. We hope it was rewarding and enjoyable.
              </p>
              <p>
                We would love get some feedback from you as a participant on this specific workshop.
                Our purposes for gathering this information are:
              </p>
              <ul>
                <li>
                  To make sure we are providing good and accurate information about workshops
                  and shows
                </li>
                <li>
                  To find out what our attendees value in workshops and thus deliver appropriate
                  content in future festivals
                </li>
                <li>
                  To provide opportunities for teachers to gain new knowledge about their teaching
                  and lesson planning
                </li>
              </ul>
              <p>
                The results of this survey will be anonymised, collated, and then shared with the
                teacher, so please feel free to be honest and constructive.
              </p>
              <p>
                If there is anything you’d like to share with us that might be better communicated
                as an incident report,
                you can <TextLink to="/code-of-conduct">send us a report here</TextLink>.
              </p>
            </div>
            <fieldset className="survey workshop-survey__questions" disabled={sending}>
              <div className="survey__question survey__question--likert">
                <p className="survey__label">
                  Did this workshop match your expectations?
                </p>
                <Likert
                  options={[
                    'No, I was disappointed',
                    'Not quite',
                    'Yes, it was what I expected',
                    'Yes, and a bit more',
                    'It was far better than I expected',
                  ]}
                  value={expectations}
                  onChange={setExpectations}
                />
              </div>

              {levels.length && levels.length < 3 && (
                <div className="survey__question survey__question--likert">
                  <p className="survey__label">
                    This workshop was labelled as suitable
                    for {session.activity.levels.join('/')} improvisors.
                    Did it feel suitable for that level? (3 is “about right”)
                  </p>
                  <Likert
                    options={[
                      'No, it was too easy',
                      'It was a bit easy',
                      'It was about right',
                      'It was a bit hard',
                      'No, it was too hard',
                    ]}
                    value={difficulty}
                    onChange={setDifficulty}
                  />
                </div>
              )}

              <div className="survey__question survey__question--text">
                <LabelledField
                  className="survey__text-field"
                  label="What did you love about this workshop?"
                  autoSize
                  multiline
                  name="good"
                  value={good}
                  onChange={goodChanged}
                />
              </div>

              <div className="survey__question survey__question--text">
                <LabelledField
                  className="survey__text-field"
                  label="Could anything have badd your experience?"
                  autoSize
                  multiline
                  name="bad"
                  value={bad}
                  onChange={badChanged}
                />
              </div>

              <div className="survey__question survey__question--text">
                <LabelledField
                  className="survey__text-field"
                  label={`Would you like to provide a testimonial for ${thisTeacher}?`}
                  autoSize
                  multiline
                  name="testimonial"
                  value={testimonial}
                  onChange={testimonialChanged}
                />
              </div>

              <div className="workshop-survey__outro">
                <p>That’s it! Thanks so much for your feedback, we really appreciate it.</p>
                <p>
                  <Button primary icon="send" text="Send my response" onClick={send} />
                </p>
              </div>
            </fieldset>
          </Fragment>
        )}
      </div>
    </section>
  )
}

Survey.propTypes = {
  session: PropTypes.session,
  loading: PropTypes.bool,
  sending: PropTypes.bool,
  sent: PropTypes.bool,
  onSend: PropTypes.func.isRequired,
}

Survey.defaultProps = {
  session: null,
  loading: false,
  sending: false,
  sent: false,
}

export default Survey
