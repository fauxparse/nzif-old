import React from 'react'
import styled from 'styled-components'
import { Link, withRouter } from 'react-router-dom'
import chroma from 'chroma-js'
import BrandedText from '../../styles/branded_text'

const Logo = styled(Link)`
  background: ${props => chroma(props.theme.colors.text).alpha(0).css()};
  color: ${props => props.theme.colors.text};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: -1em;
  padding: 0 1em;
  text-decoration: none;
  transition: ${props => props.theme.transition()};

  &:hover,
  &:focus {
    background: ${props => chroma(props.theme.colors.text).alpha(0.15).css()};
    outline: none;
  }

  ${BrandedText} {
    font-size: ${props => props.theme.fonts.scale(2)};
  }

  small {
    display: none;
    font-size: 100%;

    @media (min-width: ${props => props.theme.layout.medium}) {
      display: inline;
      margin-left: 0.5em;
    }
  }
`

export default withRouter(({ match }) => (
  <Logo to={match.url}>
    <BrandedText>NZIF<small>{match.params.year}</small></BrandedText>
  </Logo>
))
