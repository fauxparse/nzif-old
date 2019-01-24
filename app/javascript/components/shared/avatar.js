import React from 'react'
import styled, { css } from 'styled-components'
import { palette } from '../../themes/colors'
import Icon from '../icons'

const AvatarContainer = styled.span`${({ theme, background }) => css`
  background: ${(background || theme.colors.grey()).shade(600)};
  color: ${(background || theme.colors.grey()).shade(200)};
  border-radius: 50%;
  height: 2.5em;
  padding: 0.5em 0;
  width: 2.5em;
  line-height: 1.5em;
  text-align: center;
  -webkit-font-smoothing: antialiased;
`}`

const COLORS = palette.names().slice(1)

function hashCode(str) {
  let hash = 0

  for (let i = 0; i < str.length; i++) {
    const chr = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + chr
    hash |= 0
  }
  return Math.abs(hash)
}

const colorFromString = str => palette[COLORS[hashCode(str) % COLORS.length]]()

const initials = str => str.split(/\s+/).map(s => s[0]).join('').toUpperCase().substr(0, 3)

const Avatar = React.forwardRef(({ name, ...props }, ref) =>
  <AvatarContainer ref={ref} title={name} background={colorFromString(name)} {...props}>
    {initials(name)}
  </AvatarContainer>
)

export default Avatar
