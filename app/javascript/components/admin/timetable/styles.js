import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  .new-session {
    top: 25vh;
    transform: translate3d(-50%, 25vh, 0);

    &--opening {
      transform: translate3d(-50%, 0, 0);
    }

    &--closing {
      transform: translate3d(-50%, 0, 0);
    }
  }
`
