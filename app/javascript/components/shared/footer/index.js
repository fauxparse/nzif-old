import styled from 'styled-components'
import { fullWidth } from '../../../styles'

const FooterContainer = styled.footer`
  ${fullWidth}

  background: ${({ theme }) => theme.colors.palette.grey[500]};
  color: white;
  min-height: 6em;
`

export default FooterContainer
