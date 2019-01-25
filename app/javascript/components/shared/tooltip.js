import React from 'react'
import { Tooltip } from 'react-tippy'
import { css } from 'styled-components'
import { EASING } from '../../styles/transition'

export const tooltipStyles = ({ theme }) => css`
  .tippy-touch {
    cursor: pointer !important;
  }

  .tippy-popper {
    max-width: 400px;
    z-index: 9999;
    outline: 0;
    transition-timing-function: ${EASING.decelerate};
    pointer-events: none;

    &.html-template {
      max-width: 96%;
      max-width: calc(100% - 20px);
    }

    &[x-placement^=top] {
      [x-arrow] {
        border-top: 0.5rem solid ${theme.colors.grey(700)};
        border-right: 0.5rem solid transparent;
        border-left: 0.5rem solid transparent;
        bottom: -0.5rem;
        margin: 0 0.5rem;
      }

      [data-animation=shift] {
        &.enter {
          opacity: 1;
          transform: translateY(-0.5rem);
        }

        &.leave {
          opacity: 0;
          transform: translateY(0);
        }
      }
    }

    &[x-placement^=bottom] {
      [x-arrow] {
        border-bottom: 0.5rem solid ${theme.colors.grey(700)};
        border-right: 0.5rem solid transparent;
        border-left: 0.5rem solid transparent;
        top: -0.5rem;
        margin: 0 0.5rem;
      }

      [data-animation=shift] {
        &.enter {
          opacity: 1;
          transform: translateY(0.5rem);
        }

        &.leave {
          opacity: 0;
          transform: translateY(0);
        }
      }
    }

    &[x-placement^=left] {
      [x-arrow] {
        border-left: 0.5rem solid ${theme.colors.grey(700)};
        border-top: 0.5rem solid transparent;
        border-bottom: 0.5rem solid transparent;
        right: -0.5rem;
        margin: 0.5rem 0;
      }

      [data-animation=shift] {
        &.enter {
          opacity: 1;
          transform: translateX(-0.5rem);
        }

        &.leave {
          opacity: 0;
          transform: translateX(0);
        }
      }
    }

    &[x-placement^=right] {
      [x-arrow] {
        border-right: 0.5rem solid ${theme.colors.grey(700)};
        border-top: 0.5rem solid transparent;
        border-bottom: 0.5rem solid transparent;
        left: -0.5rem;
        margin: 0.5rem 0;
      }

      [data-animation=shift] {
        &.enter {
          opacity: 1;
          transform: translateX(0.5rem);
        }

        &.leave {
          opacity: 0;
          transform: translateX(0);
        }
      }
    }
  }

  .tippy-tooltip {
    position: relative;
    color: ${theme.colors.grey(100)};
    border-radius: ${theme.layout.borderRadius};
    font-size: ${theme.fonts.size(-1)};
    padding: 0.5em 1em;
    text-align: center;
    will-change: transform;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${theme.colors.grey(700)};
    box-shadow: ${theme.shadow(16)};
  }

  .tippy-tooltip[data-inertia] {
    transition-timing-function: ${EASING.standard};
  }

  .tippy-tooltip [x-arrow] {
    position: absolute;
    width: 0;
    height: 0;
  }

  @media (max-width:450px) {
    .tippy-popper {
      max-width: 96%;
      max-width: calc(100% - 20px);
    }
  }
`

const StyledTooltip = (props) =>
  <Tooltip animateFill={false} arrow style={{ display: 'block' }} {...props} />

export default StyledTooltip
