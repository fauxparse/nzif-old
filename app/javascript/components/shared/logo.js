import React from 'react'
import PropTypes from 'prop-types'
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

class Logo extends React.PureComponent {
  render() {
    const { year } = this.props

    return (
      <LogoContainer>
        <a href="/">NZIF {year}</a>
      </LogoContainer>
    )
  }
}

Logo.propTypes = {
  year: PropTypes.number
}

export default Logo
