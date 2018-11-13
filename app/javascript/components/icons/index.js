import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ICONS from './all'

const Svg = styled.svg`
  display: inline-block;
  font-size: 1.5em;
  width: 1em;
  height: 1em;
  fill: none;
  stroke: currentColor;
  stroke-width: 0.083333333em;
  stroke-linecap: round;
  stroke-linejoin: round;
`

class Icon extends React.PureComponent {
  render() {
    const { children, name, className, ...props } = this.props

    if (children || name) {
      return (
        <Svg className={className} {...props}>
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

Icon.ICONS = ICONS

export default styled(Icon)``
