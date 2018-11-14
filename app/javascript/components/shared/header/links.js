import styled from 'styled-components'
import Menu from './menu'
import Link from './link'

export default styled(Menu)`
  @media (min-width: ${({ theme }) => theme.layout.medium}) {
    display: flex;
    position: static;
    transition: none;

    ${Link} {
      &::after {
        background: ${props => props.theme.colors.accent};
        bottom: 50%;
        content: '';
        height: 0.25em;
        left: 1em;
        right: 1em;
        margin-bottom: -1em;
        position: absolute;
        transform: scaleX(0);
        transition: ${({ theme }) => theme.transition('transform', 100)};
      }

      &:hover,
      &:focus,
      &.active {
        &::after {
          transform: scaleX(1);
        }
      }
    }

    ${Link.Icon} {
      display: none;
    }
  }
`
