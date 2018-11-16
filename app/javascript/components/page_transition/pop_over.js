import { createGlobalStyle } from 'styled-components'

const transitionClassName = 'pop-over'
const duration = 1000

export const Styles = createGlobalStyle`
  .${transitionClassName} {
    z-index: 200;

    &-enter {
      &-active {
      }
    }

    &-exit {
      &-active {
      }
    }
  }
`

export default { transition: transitionClassName, duration }
