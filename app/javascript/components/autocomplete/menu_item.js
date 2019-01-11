import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

export const StyledMenuItem = styled.li`${({ theme }) => css`
  padding: 0.5rem 1rem;
  font-size: ${theme.fonts.size(1)};

  &[aria-selected] {
    background: ${theme.colors.accent};
    color: ${theme.colors.white};
  }
`}`

const StyledHighlight = styled.span`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const Highlight = ({ text, prefix, ...props }) => (
  <StyledHighlight {...props}>
    <b>{text.substring(0, prefix.length)}</b>{text.substring(prefix.length)}
  </StyledHighlight>
)

const MenuItem = ({ label, selected, selectedText }) => (
  <StyledMenuItem aria-selected={selected || undefined}>
    <Highlight text={label} prefix={selectedText} />
  </StyledMenuItem>
)

MenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  selectedText: PropTypes.string.isRequired,
}

export default MenuItem
