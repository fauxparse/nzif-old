import React from 'react'
import styled from 'styled-components'
import { fullWidth } from '../../../styles'
import Theme from './theme'

const FooterContainer = styled.footer`
  ${fullWidth}

  background: ${({ theme }) => theme.colors.background};
  min-height: 6em;
`

const Footer = React.forwardRef(({ children }, ref) => (
  <Theme>
    <FooterContainer ref={ref}>
      {children}
    </FooterContainer>
  </Theme>
))

export default Footer
