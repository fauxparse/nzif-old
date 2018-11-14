import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import Link from './link'
import BrandedText from '../../../styles/branded_text'

const Logo = styled(Link)`
  ${BrandedText} {
    font-size: ${props => props.theme.fonts.scale(2)};
  }
`

export default styled(withRouter(({ match, className }) => (
  <Logo to={match.url} className={className}>
    <BrandedText>NZIF {match.params.year}</BrandedText>
  </Logo>
)))``
