import React, { useMemo } from 'react'
import PropTypes from 'lib/proptypes'
import padStart from 'lodash/padStart'
import Digit from './digit'

const Group = ({ digits, pad, label }) => {
  const characters = useMemo(() => padStart(digits.toString(), pad, '0').split(''), [digits, pad])
  return (
    <div className="counter__group">
      {characters.map((c, i) => <Digit key={i} digit={c} />)}
      {label && <span className="counter__label">{label}</span>}
    </div>
  )
}

Group.propTypes = {
  digits: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
    PropTypes.shape({ toString: PropTypes.func.isRequired }).isRequired,
  ]).isRequired,
  pad: PropTypes.number,
  label: PropTypes.string,
}

Group.defaultProps = {
  pad: 0,
  label: undefined,
}

export default Group
