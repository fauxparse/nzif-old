import styled from 'styled-components'
import FullWidth from '../../../styles/full_width'

const FooterContainer = styled(FullWidth)`
  background: ${({ theme }) => theme.colors.palette.grey[500]};
  color: white;
  min-height: 6em;
`

export default FooterContainer
