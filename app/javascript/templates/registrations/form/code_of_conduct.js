import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'lib/proptypes'
import moment from 'lib/moment'
import Checkbox from 'atoms/checkbox'
import Loader from 'atoms/loader'
import Tooltip from 'atoms/tooltip'
import ReadEverything from 'molecules/read_everything'
import Markdown from 'molecules/markdown'
import { useStaticContent } from 'contexts/static_content'
import { useRegistration } from 'contexts/registration'
import Heading from './heading'

const CodeOfConduct = ({ onChange }) => {
  const { registration: { codeOfConductAcceptedAt }, change } = useRegistration()

  const [read, setRead] = useState(!!codeOfConductAcceptedAt)

  const finishedReading = useCallback(() => setRead(true), [setRead])

  const checkboxChanged = useCallback((e) => {
    const agreed = e.target.checked ? moment().toISOString() : null
    change({ codeOfConductAcceptedAt: agreed })
  }, [change])

  const { loading, raw } = useStaticContent('code-of-conduct')

  useEffect(() => {
    onChange({ valid: !!codeOfConductAcceptedAt })
  }, [codeOfConductAcceptedAt, onChange])

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
          checked={!!codeOfConductAcceptedAt}
          disabled={!read}
          onChange={checkboxChanged}
        >
          I agree to the Code of Conduct
        </Checkbox>
      </Tooltip>
    </section>
  )
}

CodeOfConduct.propTypes = {
  registration: PropTypes.shape({
    codeOfConductAgreedAt: PropTypes.string,
  }),
  onChange: PropTypes.func.isRequired,
}

export default CodeOfConduct
