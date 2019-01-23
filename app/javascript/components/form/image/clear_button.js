import React from 'react'
import styled from 'styled-components'
import Button from '../../button'

const StyledButton = styled(Button)`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  padding: 0.25rem;
  background: rgba(0, 0, 0, 0.625);
  color: white;
  border: 0;

  ${Button.Icon} {
    font-size: 1rem;
    width: 1rem;
    height: 1rem;
    stroke-width: 3px;
  }
`

const ClearButton = (props) => <StyledButton icon="close" {...props} />

export default ClearButton
