import styled, { css } from 'styled-components'

const Block = styled.div`${({ theme }) => css`
  background: ${theme.colors.plum[300]};
  border: 1px solid ${theme.colors.plum[500]};
  margin: 1px;
  border-radius: 0.25em;
  position: relative;
`}`

Block.Placed = styled(Block)`${({ 'data-start': start, 'data-height': height }) => css`
  grid-row: ${start + 1} / span ${height};
`}`

export default Block
