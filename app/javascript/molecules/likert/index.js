import React, { useCallback } from 'react'
import PropTypes from 'lib/proptypes'
import Radio from 'atoms/radio'

import './index.scss'

const Likert = ({ options, value, onChange }) => {
  const changed = useCallback(e => {
    if (e.target.checked) {
      onChange(parseInt(e.target.value, 10))
    }
  }, [onChange])

  return (
    <div className="likert">
      <ul className="likert__options">
        {options.map((option, index) => (
          <li className="likert__option" key={index + 1}>
            <Radio
              name={name}
              value={index + 1}
              checked={value === index + 1}
              onChange={changed}
              aria-label={option}
            >
              {option}
            </Radio>
          </li>
        ))}
      </ul>
    </div>
  )
}

Likert.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string.isRequired),
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
}

Likert.defaultProps = {
  value: undefined,
}

export default Likert
