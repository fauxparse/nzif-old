import React from 'react'
import styled from 'styled-components'

const LogoContainer = styled.div`
  font-family: ${props => props.theme.fonts.branding};
  font-weight: 700;

  a {
    color: white;
    text-decoration: none;
    font-size: ${props => props.theme.fonts.scale(1)};
  }
`

export default class Logo extends React.PureComponent {
  render() {
    return (
      <LogoContainer>
        <a href="/">NZIF</a>
      </LogoContainer>
    )
  }
}
