import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import Button from '../../button'

const LEVELS = ['beginner', 'intermediate', 'advanced']

const StyledLevel = styled(Button)`${({ theme }) => css`
  font-size: ${theme.fonts.size(-1)};
  text-transform: capitalize;
  line-height: 1.5rem;
  padding: 0.5rem 1rem;
  border: 0;

  &:not(:last-child) {
    margin-right: 1rem;
  }

  ${LEVELS.map(level => css`
    &[data-level="${level}"] {
      color: ${theme.colors.disabled};

      &[aria-checked] {
        background-color: ${theme.colors[level]};
        color: ${theme.colors[level].shade(100)};
      }

      &:focus {
        box-shadow: 0 0 0 0.25rem ${theme.colors[level].shade(800)};
      }
    }
  `)}
`}`

const StyledLevels = styled.div`
  display: flex;
`

const Level = ({ level, selected, ...props }) => (
  <StyledLevel {...props} data-level={level} role="checkbox" aria-checked={selected}>
    {level}
  </StyledLevel>
)

const Levels = ({ levels, onClick }) => (
  <StyledLevels>
    {LEVELS.map(level => (
      <Level
        key={level}
        level={level}
        selected={(levels.indexOf(level) > -1) || undefined}
        onClick={onClick}
      />
    ))}
  </StyledLevels>
)

Levels.propTypes = {
  levels: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Levels
