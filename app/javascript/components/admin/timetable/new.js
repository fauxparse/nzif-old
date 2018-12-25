import React from 'react'
import PropTypes from 'prop-types'
import MomentPropTypes from 'react-moment-proptypes'
import styled, { css } from 'styled-components'

const StyledNewSession = styled.section`${({ theme }) => css`

`}`

class NewSession extends React.Component {
  static propTypes = {
    // startsAt: MomentPropTypes.momentObj.isRequired,
    // endsAt: MomentPropTypes.momentObj.isRequired,
    // onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  }

  render() {
    const { onCancel } = this.props
    return (
      <StyledNewSession>
        <h4 onClick={onCancel}>New Session</h4>
      </StyledNewSession>
    )
  }
}

export default NewSession
