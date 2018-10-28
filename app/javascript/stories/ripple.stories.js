/* global module */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import styled from 'styled-components'
import Ripple from '../components/ripple'

const RippleContainer = styled(Ripple)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: ${props => props.colored ? props.theme.colors.accent : 'inherit'};
  color: ${props => props.colored ? 'white' : 'inherit'};
`

storiesOf('Effects', module)
  .addDecorator(withKnobs)
  .add('Ripple', () => (
    <RippleContainer colored={boolean('Coloured background', false)} />
  ))
