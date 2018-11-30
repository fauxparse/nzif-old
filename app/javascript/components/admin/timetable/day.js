import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import sticky from '../../../lib/sticky'
import { media } from '../../../styles'

const StyledDay = styled.section`${({ theme }) => css`
  flex: 1 0 calc(100vw - 4.5em);

  ${media.medium`
    flex-basis: calc((100vw - 4.5em) / 3);
    background: linear-gradient(to right, ${theme.colors.border}, transparent 1px);
  `}

  ${media.large`
    flex-basis: 0;
  `}
`}`

const Header = styled.header`${({ theme }) => css`
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  height: 3.5em;
  border-bottom: 1px solid ${theme.colors.border};
  background: ${theme.colors.background};
`}`

const Hours = styled.div`${({ theme }) => css`
  height: 54em;
  background: linear-gradient(to top, ${theme.colors.border}, transparent 1px) repeat-y 0 0 / 100% 3em;
`}`

class Day extends React.Component {
  header = React.createRef()

  static propTypes = {
    scale: PropTypes.number,
  }

  static defaultProps = {
    scale: 0.75,
  }

  componentDidMount() {
    this.sticky = sticky.addOne(this.header.current)
  }

  componentWillUnmount() {
    this.sticky.remove()
  }

  render() {
    const { date } = this.props

    return (
      <StyledDay>
        <Header ref={this.header}>{date.format('dddd')}</Header>
        <Hours />
      </StyledDay>
    )
  }
}

export default Day
