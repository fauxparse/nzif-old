import React, { useCallback, useState } from 'react'
import moment from 'lib/moment'
import Checkbox from 'atoms/checkbox'
import Loader from 'atoms/loader'
import Tooltip from 'atoms/tooltip'
import ReadEverything from 'molecules/read_everything'
import Markdown from 'molecules/markdown'
import { useStaticContent } from 'contexts/static_content'
import { useRegistration } from 'contexts/registration'
import Heading from './heading'

const CodeOfConduct = () => {
  const { registration: { codeOfConductAcceptedAt }, change } = useRegistration()

  const [read, setRead] = useState(!!codeOfConductAcceptedAt)

  const [agreed, setAgreed] = useState(!!codeOfConductAcceptedAt)

  const finishedReading = useCallback(() => setRead(true), [setRead])

  const checkboxChanged = useCallback((e) => {
    const agreed = e.target.checked ? moment().toISOString() : null
    setAgreed(agreed)
    change({ codeOfConductAcceptedAt: agreed })
  }, [change, setAgreed])

  const { loading, raw } = useStaticContent('code-of-conduct')

  return (
    <section className="registration-form__section registration-form__code-of-conduct">
      <Heading>Code of conduct</Heading>
      <p>
        We ask all Festival participants to be familiar with our Code of Conduct.
        Whether this is your first time or your eleventh, please take a moment now to read
        the Code and make sure you understand and agree with its contents.
      </p>
      <ReadEverything disabled={loading} onRead={finishedReading}>
        {loading ? <Loader /> : <Markdown text={raw} />}
      </ReadEverything>

      <Tooltip title="Please scroll to the bottom before continuing" disabled={read}>
        <Checkbox
          checked={agreed}
          disabled={!read}
          onChange={checkboxChanged}
        >
          I agree to the Code of Conduct
        </Checkbox>
      </Tooltip>
    </section>
  )
}

export default CodeOfConduct
