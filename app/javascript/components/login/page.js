import React from 'react'
import styled, { keyframes } from 'styled-components'
import CloseButton from './close_button'
import { DURATION, EASING } from '../../themes/transition'

const zoomIn = keyframes`
  0% { transform: scale(0); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
`

const zoomOut = keyframes`
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(0); opacity: 0; }
`

const Background = styled.svg`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  circle {
    fill: ${({ theme }) => theme.colors.background};
  }

  .pop-over-enter-active & {
    circle {
      animation: ${zoomIn} 500ms cubic-bezier(0.4, 0.0, 0.2, 1) normal forwards;
    }
  }

  .pop-over-exit-active & {
    circle {
      animation: ${zoomOut} 300ms cubic-bezier(0.4, 0.0, 0.2, 1) 500ms normal forwards;
    }
  }
`

const LogInPage = styled.section`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 200;
  transform: translate3d(0, 0, 0);

  fieldset {
    position: relative;
    padding: 1em;
    width: 22em;
  }

  &.pop-over-enter {
    ${CloseButton} {
      opacity: 0;
      transform: scale(0);
      transition: none;
    }

    fieldset > * {
      transform: translateY(10vh);
      opacity: 0;
      transition: none;
    }
  }

  &.pop-over-enter-active {
    ${CloseButton} {
      opacity: 0.625;
      transform: scale(1);
      transition: ${({ theme }) => theme.transition()};
      transition-delay: 300ms;
    }

    fieldset > * {
      transform: translateY(0);
      opacity: 1;
      transition: ${({ theme }) => `${theme.transition('opacity')}, ${theme.transition('transform', DURATION.standard, EASING.decelerate)}`};
      transition-delay: 300ms;

      &:nth-child(1) { transition-delay: 300ms; }
      &:nth-child(2) { transition-delay: 350ms; }
      &:nth-child(3) { transition-delay: 400ms; }
      &:nth-child(4) { transition-delay: 450ms; }
      &:nth-child(5) { transition-delay: 500ms; }
      &:nth-child(6) { transition-delay: 550ms; }
      &:nth-child(7) { transition-delay: 600ms; }
    }
  }

  &.pop-over-exit {
    ${CloseButton} {
      opacity: 0.625;
      transform: scale(1);
    }

    fieldset > * {
      transform: translateY(0);
      opacity: 1;
    }
  }

  &.pop-over-exit-active {
    ${CloseButton} {
      opacity: 0;
      transform: scale(0);
    }

    fieldset > * {
      transform: translateY(10vh);
      opacity: 0;
      transition: ${({ theme }) => `${theme.transition('opacity')}, ${theme.transition('transform', DURATION.standard, EASING.accelerate)}`};

      &:nth-last-child(1) { transition-delay: 0ms; }
      &:nth-last-child(2) { transition-delay: 50ms; }
      &:nth-last-child(3) { transition-delay: 100ms; }
      &:nth-last-child(4) { transition-delay: 150ms; }
      &:nth-last-child(5) { transition-delay: 200ms; }
      &:nth-last-child(6) { transition-delay: 250ms; }
      &:nth-last-child(7) { transition-delay: 300ms; }
    }
  }
`

const Page = ({ onClose, children, ...props }) => (
  <LogInPage {...props}>
    <Background width="100%" height="100%" viewBox="-100 0 100 100" preserveAspectRatio="xMaxYMin slice">
      <circle cx={0} cy={0} r={150} />
    </Background>
    {children}
    <CloseButton icon="close" onClick={onClose} />
  </LogInPage>
)

export default Page
