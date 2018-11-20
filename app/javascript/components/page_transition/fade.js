import { css } from 'styled-components'

const transitionClassName = 'fade'
const duration = 50

export const styles = css`
  .${transitionClassName} {
    &-enter,
    &-exit {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
    }

    &-enter {
      opacity: 0;

      &-active {
        opacity: 1;
        transition: ${({ theme }) => theme.transition('opacity', duration)};
      }
    }

    &-exit {
      opacity: 1;

      &-active {
        opacity: 0;
        transition: ${({ theme }) => theme.transition('opacity', duration)};
      }
    }
  }
`

export default { transition: transitionClassName, duration }
