import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ICONS from './all'

const Svg = styled.svg`
  color: ${({ theme }) => theme.colors.icon};
  display: inline-block;
  font-size: 1.5em;
  width: 1em;
  height: 1em;
  fill: none;
  stroke: currentColor;
  stroke-width: 2px;
  stroke-linecap: round;
  stroke-linejoin: round;
`

class Icon extends React.PureComponent {
  render() {
    const { children, name, className, viewBox = '0 0 24 24', ...props } = this.props

    if (children || name) {
      return (
        <Svg className={className} viewBox={viewBox} {...props}>
          {children || <use xlinkHref={`#icon-${name}`} />}
        </Svg>
      )
    } else {
      return null
    }
  }
}

Icon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.oneOf(ICONS),
}

export { ICONS }

export default Icon
