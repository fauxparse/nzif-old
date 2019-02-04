/* eslint-disable react/display-name */

import React from 'react'
import Ripple from '../../components/shared/ripple'
import { color } from '../knobs'

export default () => {
  const background = color('Background')
  return (
    <Ripple
      background={color('Background')}
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        background: background || 'inherit',
        color: background ? 'white' : 'inherit',
      }}
    />
  )
}
