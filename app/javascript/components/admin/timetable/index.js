import React from 'react'
import styled from 'styled-components'
import moment from '../../../lib/moment'
import Days from './days'
import Day from './day'
import Times from './times'

const StyledTimetable = styled.section`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  overflow-x: hidden;
  touch-action: pan-y;
`

class Timetable extends React.Component {
  render() {
    return (
      <StyledTimetable>
        <Times />
        <Days>
          {Array(8).fill(0).map((_, i) => moment().startOf('day').add(i, 'days')).map(day => (
            <Day key={day.valueOf()} date={day} />
          ))}
        </Days>
      </StyledTimetable>
    )
  }
}

export default Timetable
