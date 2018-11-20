import { css, keyframes } from 'styled-components'
import { EASING } from '../../themes/transition'

const transitionClassName = 'push'
const duration = 1500

const pushIn = keyframes`
  0% { transform: translate3d(100vw, 0, 0) scale(0.9); }
  50% { transform: translate3d(0, 0, 0) scale(0.9); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
`

const pushOut = keyframes`
  0% { transform: translate3d(0, 0, 0) scale(1); }
  50% { transform: translate3d(0, 0, 0) scale(0.9); }
  100% { transform: translate3d(-100vw, 0, 0) scale(0.9); }
`

export const styles = css`
  .push,
  .pop {
    &-enter,
    &-exit {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      overflow: hidden;
      box-shadow: ${({ theme }) => theme.shadow(24)};
    }

    &-enter {
      transform: translate3d(100vw, 0, 0);

      &-active {
        animation: ${pushIn} 1s ${EASING.standard} 0.5s forwards;
      }
    }

    &-exit {
      &-active {
        animation: ${pushOut} 1s ${EASING.standard} forwards;
      }
    }
  }

  .pop-enter-active {
    animation: ${pushOut} 1s ${EASING.standard} 0.5s reverse forwards;
  }

  .pop-exit-active {
    animation: ${pushIn} 1s ${EASING.standard} reverse forwards;
  }
`

export const push = { transition: 'push', duration: duration }
export const pop = { transition: 'pop', duration: duration }

export default { transition: transitionClassName, duration }
