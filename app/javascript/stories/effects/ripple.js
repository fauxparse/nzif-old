/* eslint-disable react/display-name */

import React from 'react'
import styled from 'styled-components'
import Ripple from '../../components/shared/ripple'
import { color } from '../knobs'

const RippleContainer = styled(Ripple)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: ${props => props.background || 'inherit'};
  color: ${props => props.background ? 'white' : 'inherit'};
`

export default () => <RippleContainer background={color('Background')} />
