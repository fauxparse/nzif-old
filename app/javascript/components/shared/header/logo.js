import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from './link'
import { text } from '../../../styles'

const LogoText = styled(Link.Text)`
  ${text.branded}

  font-size: ${props => props.theme.fonts.size(3)};
`

const Logo = styled(Link).attrs(({ root, year }) => ({
  to: root,
  children: <LogoText>NZIF {year}</LogoText>,
}))``

Logo.propTypes = {
  root: PropTypes.string,
  year: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
}

Logo.defaultProps = {
  root: '/',
}

export default Logo
