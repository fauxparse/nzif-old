import styled from 'styled-components'
import RippledLink from './../rippled_link'

export default styled(RippledLink)`
  align-items: center;
  color: ${props => props.theme.colors.text};
  display: flex;
  opacity: 0.75;
  padding: 0 0.5em;
  position: relative;
  text-decoration: none;
  transition: ${props => props.theme.transition('color')};

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 0.25em;
    background: ${props => props.theme.colors.accent};
    transform: scaleY(0);
    transition: transform 0.15s cubic-bezier(0.5, -0.5, 0.5, 1);
  }

  &:hover,
  &:focus,
  &.active {
    outline: none;
    opacity: 1;

    &::after {
      transform: scaleY(1);
      transition: transform 0.15s cubic-bezier(0.5, 2, 0.75, 1);
    }
  }

  @media (min-width: ${({ theme }) => theme.layout.medium}) {
    &::after {
      left: 50%;
      top: auto;
      bottom: 50%;
      margin: 0 -0.75em -1em;
      width: 1.5em;
      height: 0.25em;
      transform: scaleX(0);
    }

    &:hover,
    &:focus,
    &.active {
      &::after {
        transform: scaleX(1);
      }
    }
  }
`
