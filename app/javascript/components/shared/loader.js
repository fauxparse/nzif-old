import React from 'react'
import styled, { keyframes } from 'styled-components'
import colors from '../../themes/colors'

const offset = 201
const duration = 1400

const rotator = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(270deg); }
`

const dash = keyframes`
  0% { stroke-dashoffset: ${offset}; }
  50% {
    stroke-dashoffset: ${offset / 4};
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: ${offset};
    transform: rotate(450deg);
  }
`

const rainbow = keyframes`
  0% { stroke: ${colors.tomato()}; }
  17% { stroke: ${colors.mandarin()}; }
  33% { stroke: ${colors.apple()}; }
  50% { stroke: ${colors.mint()}; }
  67% { stroke: ${colors.grape()}; }
  83% { stroke: ${colors.plum()}; }
`

const StyledLoader = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 5em;
  height: 5em;
  margin: -2.5em;

  svg {
    display: block;
    animation: ${rotator} ${duration}ms linear infinite
  }

  circle {
    fill: none;
    stroke-width: 8;
    stroke-linecap: round;
    stroke: ${colors.accent};
    stroke-dasharray: ${offset};
    stroke-dashoffset: 0;
    transform-origin: 0 0;
    animation: ${dash} ${duration}ms ease-in-out infinite,
      ${rainbow} ${duration * 5}ms ease-in-out infinite;
  }
`

const Loader = () => (
  <StyledLoader>
    <svg width="80px" height="80px" viewBox="-40 -40 80 80" xmlns="http://www.w3.org/2000/svg">
      <circle cx={0} cy={0} r={32} />
    </svg>
  </StyledLoader>
)

export default Loader
