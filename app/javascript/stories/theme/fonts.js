/* eslint-disable react/display-name */

import React from 'react'
import PropTypes from 'prop-types'

const BASE_SIZE = 2

const Row = ({ size }) => (
  <div style={{
    display: 'flex',
    alignItems: 'baseline',
    margin: '1rem 0',
  }}>
    <small style={{ flex: '0 0 4.5rem' }}>{size}</small>
    <span
      data-font-scale={size}
      style={{
        flex: 1,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}
    >
      Jinxed wizards pluck ivy from the big quilt.
    </span>
  </div>
)

Row.propTypes = {
  size: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
}

const Fonts = () => (
  <div>
    {new Array(12).fill(0).map((size, index) => <Row key={size} size={index - BASE_SIZE} />)}
  </div>
)

export default () => <Fonts />
