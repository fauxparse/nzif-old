import styled, { css } from 'styled-components'
import { transition } from '../../../styles'

const Block = styled.div`${({ theme }) => css`
  background: ${theme.colors.plum[300]};
  border: 1px solid ${theme.colors.plum[500]};
  margin: 1px;
  min-width: 1px;
  border-radius: 0.25em;
  position: relative;
  box-shadow: ${theme.shadow(0)};
  transition: ${transition('box-shadow', 'background-color')};

  &[aria-grabbed] {
    box-shadow: ${theme.shadow(8)};
    background-color: ${theme.colors.plum[400]};
  }
`}`

Block.Placed = styled(Block)`${({ 'data-start': start, 'data-height': height }) => css`
  grid-row: ${start + 1} / span ${height};

  ::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 0.5em;
    cursor: ns-resize;
  }
`}`

export default Block
