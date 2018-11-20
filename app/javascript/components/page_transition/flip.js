import { css, keyframes } from 'styled-components'
import { EASING } from '../../themes/transition'

const transitionClassName = 'flip'
const duration = 1500

const flipIn = keyframes`
  0% { transform: translate3d(100vw, 0, 0) scale(0.9); }
  50% { transform: translate3d(0, 0, 0) scale(0.9); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
`

const flipOut = keyframes`
  0% { transform: translate3d(0, 0, 0) scale(1); }
  50% { transform: translate3d(0, 0, 0) scale(0.9); }
  100% { transform: translate3d(-100vw, 0, 0) scale(0.9); }
`

export const styles = css`
  .${transitionClassName} {
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
  animation: ${flipIn} 1s ${EASING.standard} 0.5s forwards;
      }
    }

    &-exit {
      &-active {
        animation: ${flipOut} 1s ${EASING.standard} forwards;
      }
    }
  }
`

export default { transition: transitionClassName, duration }
