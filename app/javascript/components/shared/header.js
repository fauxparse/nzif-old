import React from 'react'
import styled from 'styled-components'
import Logo from './logo'

const HeaderContainer = styled.header`
  background: black;
  color: white;
`

export default class Header extends React.Component {
  render() {
    return (
      <HeaderContainer>
        <Logo />
      </HeaderContainer>
    )
  }
}
