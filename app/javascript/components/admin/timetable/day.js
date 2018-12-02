import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { media } from '../../../styles'
import Times from './times'

const StyledDay = styled.section`
  flex: 1 0 100vw;
  scroll-snap-align: start;
  display: grid;
  grid-template-rows: 3.5em auto;
  grid-template-columns: 4.5em auto;

  ${media.medium`
    grid-template-columns: auto;
  `}

  ${media.large`
    flex-basis: 12rem;
  `}
`

const StyledHeader = styled.header`${({ theme }) => css`
  grid-row: 1;
  grid-column: 2;
  position: sticky;
  top: 0;
  background: ${theme.colors.background};
  border-bottom: 1px solid ${theme.colors.secondary};
  height: 3.5rem;
  display: flex;
  align-items: center;
  font-size: ${theme.fonts.scale(1)};

  ${media.medium`
    grid-column: 1;
  `}
`}`

const StyledTimes = styled(Times)`
  grid-row: 1 / span 2;
  grid-column: 1;

  ${media.medium`
    display: none;
  `}
`

const StyledHours = styled.div`${({ theme }) => css`
  grid-row: 2;
  grid-column: 2;
  height: 54em;
  background: linear-gradient(to top, ${theme.colors.border}, transparent 1px) repeat-y 0 0 / 100% 3em;

  ${media.medium`
    grid-column: 1;
  `}
`}`

class Day extends React.Component {
  static propTypes = {
    scale: PropTypes.number,
  }

  static defaultProps = {
    scale: 0.75,
  }

  render() {
    const { date, ...props } = this.props
    return (
      <StyledDay {...props}>
        <StyledHeader>
          {date.format('dddd')}
        </StyledHeader>
        <StyledTimes />
        <StyledHours />
      </StyledDay>
    )
  }
}

export default Day
