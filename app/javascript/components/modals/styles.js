import { css } from 'styled-components'
import media from '../../styles/media'
import transition from '../../styles/transition'

export default ({ theme }) => css`
  .modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    width: 100vw;
    height: 100vh;
    opacity: 0;
    background-color: ${theme.colors.background};
    color: ${theme.colors.foreground};
    transition: ${transition('transform', { easing: 'decelerate' })}, ${transition('opacity')};
    outline: none;
    box-shadow: ${theme.shadow(24)};
    border-radius: ${theme.layout.borderRadius};

    &--opening {
      transform: translate3d(-50%, -50%, 0);
      opacity: 1;
    }

    &--closing {
      transform: translate3d(-50%, 0, 0);
      opacity: 0;
    }

    ${media.medium`
      max-width: 30rem;
      height: auto;
    `}

    &.modal--autocomplete {
      top: 25vh;
      transform: translate3d(-50%, 25vh, 0);

      &--opening {
        transform: translate3d(-50%, 0, 0);
      }

      &--closing {
        transform: translate3d(-50%, 0, 0);
      }
    }
  }

  .modal__overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: ${theme.colors.scrim};
      opacity: 0;
      transition: ${transition('opacity')};
    }

    &--opening::before {
      opacity: 1;
    }

    &--closing::before {
      opacity: 0;
    }
  }
`
