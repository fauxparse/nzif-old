import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import chroma from 'chroma-js'
import Icon from '../icons'

const AvatarContainer = styled.span`
  background: ${({ theme }) => chroma(theme.colors.text).alpha(0.15).css()};
  border-radius: 50%;
  height: 2.5em;
  padding: 0.5em;
  width: 2.5em;
`

const Avatar = ({ name, ...props }) =>
  <AvatarContainer {...props}>
    <Icon name="user" />
  </AvatarContainer>

export default styled(Avatar)``
