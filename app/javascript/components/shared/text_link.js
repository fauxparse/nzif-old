import styled from 'styled-components'
import { Link } from 'react-router-dom'
import chroma from 'chroma-js'
import { transition } from '../../styles'

export default styled(Link)`
  background-color: ${props => chroma(props.theme.colors.accent).alpha(0).css()};
  border-radius: ${props => props.theme.layout.borderRadius};
  color: ${props => props.theme.colors.link};
  margin: 0 -0.25em;
  padding: 0 0.25em;
  text-decoration: none;
  transition: ${transition('background-color')};

  &:hover,
  &:focus {
    outline: none;
    background-color: ${props => chroma(props.theme.colors.accent).alpha(0.15).css()};
  }
`
