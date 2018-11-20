import { css } from 'styled-components'

const transitionClassName = 'slide'
const duration = 500

export const styles = css`
  .${transitionClassName} {
    &-enter,
    &-left-enter,
    &-right-enter {
      position: relative;
      opacity: 0;
    }

    &-exit,
    &-left-exit,
    &-right-exit {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      opacity: 1;
    }

    &-enter,
    &-left-enter,
    &-right-enter {
      transform: translate3d(100%, 0, 0);

      &-active {
        opacity: 1;
        transform: translate3d(0, 0, 0);
        transition: ${({ theme }) => `${theme.transition('transform', duration)}, ${theme.transition('opacity', duration)}`};
      }
    }

    &-exit,
    &-left-exit,
    &-right-exit {
      transform: translate3d(0, 0, 0);

      &-active {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
        transition: ${({ theme }) => `${theme.transition('transform', duration)}, ${theme.transition('opacity', duration)}`};
      }
    }

    &-right {
      &-enter {
        transform: translate3d(-100%, 0, 0);

        &-active {
          transform: translate3d(0, 0, 0);
        }
      }

      &-exit {
        transform: translate3d(0, 0, 0);

        &-active {
          transform: translate3d(100%, 0, 0);
        }
      }
    }
  }
`

export const left = { transition: `${transitionClassName}-left`, duration }
export const right = { transition: `${transitionClassName}-right`, duration }

export default { transition: transitionClassName, duration }
