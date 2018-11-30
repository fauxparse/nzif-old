import React from 'react'
import styled from 'styled-components'

const StyledDays = styled.section`
  flex: 1;
  display: flex;
  align-items: flex-start;
`

class Days extends React.Component {
  render() {
    const { children, ...props } = this.props
    return (
      <StyledDays {...props}>
        {children}
      </StyledDays>
    )
  }
}

export default Days
