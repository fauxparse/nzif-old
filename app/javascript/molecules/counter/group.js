import React, { useMemo } from 'react'
import PropTypes from 'lib/proptypes'
import padStart from 'lodash/padStart'
import Digit from './digit'

const Group = ({ digits, pad }) => {
  const characters = useMemo(() => padStart(digits.toString(), pad, '0').split(''), [digits, pad])
  return (
    <div className="counter__group">
      {characters.map((c, i) => <Digit key={i} digit={c} />)}
    </div>
  )
}

Group.propTypes = {
  digits: PropTypes.shape({ toString: PropTypes.func.isRequired }).isRequired,
  pad: PropTypes.number,
}

Group.defaultProps = {
  pad: 0,
}

export default Group
