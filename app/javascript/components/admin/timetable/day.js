import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { media } from '../../../styles'
import Context from './context'
import Times from './times'

const StyledDay = styled.section`
  flex: 1 0 100vw;
  scroll-snap-align: start;
  display: grid;
  grid-template-rows: 4.5em auto;
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
  height: 4.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${media.medium`
    grid-column: 1;
    padding-left: 1em;
  `}

  small {
    display: block;
    font-size: ${theme.fonts.scale(-1)};
    color: ${theme.colors.secondary};
  }
`}`

const StyledTimes = styled(Times)`
  grid-row: 1 / span 2;
  grid-column: 1;

  ${media.medium`
    display: none;
  `}
`

const StyledHours = styled.div`${({ theme, scale, granularity }) => css`
  grid-row: 2;
  grid-column: 2;
  height: 54em;
  background: linear-gradient(to top, ${theme.colors.border}, transparent 1px) repeat-y 0 0 / 100% ${scale * granularity}em;

  ${media.medium`
    grid-column: 1;
    border-left: 1px solid ${theme.colors.border};
  `}
`}`

class Day extends React.Component {
  static propTypes = {
    scale: PropTypes.number,
  }

  static defaultProps = {
    scale: 0.75,
  }

  static contextType = Context

  render() {
    const { date, ...props } = this.props
    const { start, end, scale, granularity } = this.context

    return (
      <StyledDay {...props}>
        <StyledHeader>
          {date.format('dddd')}
          <small>{date.format('D MMMM')}</small>
        </StyledHeader>
        <StyledTimes start={start} end={end} />
        <StyledHours scale={scale} granularity={granularity} />
      </StyledDay>
    )
  }
}

export default Day
