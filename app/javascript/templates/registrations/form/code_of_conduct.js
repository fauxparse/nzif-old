import React, { useCallback, useEffect, useState } from 'react'
import ReadEverything from 'molecules/read_everything'
import Markdown from 'molecules/markdown'
import Checkbox from 'atoms/checkbox'
import Loader from 'atoms/loader'
import Tooltip from 'atoms/tooltip'
import { useStaticContent } from 'contexts/static_content'
import Heading from './heading'

const CodeOfConduct = ({ onChange }) => {
  const [read, setRead] = useState(false)

  const [agreed, setAgreed] = useState(false)

  const finishedReading = useCallback(() => setRead(true), [setRead])

  const checkboxChanged = useCallback((e) => setAgreed(e.target.checked), [setAgreed])

  const { loading, raw } = useStaticContent('code-of-conduct')

  useEffect(() => onChange({ valid: agreed }), [onChange, agreed])

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
        <Checkbox checked={agreed} disabled={!read} onChange={checkboxChanged}>
          I agree to the Code of Conduct
        </Checkbox>
      </Tooltip>
    </section>
  )
}

export default CodeOfConduct
