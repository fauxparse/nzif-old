import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import chroma from 'chroma-js'
import RippledLink from '../rippled_link'
import BrandedText from '../../../styles/branded_text'

const Logo = styled(RippledLink)`
  background: ${props => chroma(props.theme.colors.text).alpha(0).css()};

  &:hover,
  &:focus {
    background: ${props => chroma(props.theme.colors.text).alpha(0.15).css()};
    outline: none;
  }

  ${BrandedText} {
    font-size: ${props => props.theme.fonts.scale(2)};
  }
`

export default styled(withRouter(({ match, className }) => (
  <Logo to={match.url} className={className}>
    <BrandedText>NZIF {match.params.year}</BrandedText>
  </Logo>
)))``
