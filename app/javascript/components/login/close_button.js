import Button from '../button'
import styled from 'styled-components'

const CloseButton = styled(Button)`
  position: absolute;
  top: 1em;
  right: 1em;
  color: ${({ theme }) => theme.colors.text};
  border-color: transparent;
  opacity: 0.625;
  transition: ${({ theme }) => theme.transition()};

  &:hover,
  &:focus,
  &:active {
    opacity: 1;
  }
`

CloseButton.defaultProps = {
  icon: 'close',
}

export default CloseButton
