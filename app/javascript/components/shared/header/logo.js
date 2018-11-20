import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from './link'
import { text } from '../../../styles'

const LogoText = styled(Link.Text)`
  ${text.branded}

  font-size: ${props => props.theme.fonts.scale(2)};
`

const Logo = styled(Link).attrs(({ year }) => ({
  to: `/${year}`,
  children: <LogoText>NZIF {year}</LogoText>,
}))``

Logo.propTypes = {
  year: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
}

export default Logo
