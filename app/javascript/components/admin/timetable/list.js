import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import Context from './context'
import Block from './block'

const StyledList = styled.div`${({ theme, scale, granularity, 'data-rows': rows }) => css`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: repeat(${rows}, 1em);
  font-size: ${scale}em;
  background: linear-gradient(to top, ${theme.colors.border}, transparent 1px) repeat-y 0 0 / 100% ${granularity}em;
`}`

const Selection = styled(Block.Placed)`
  background-color: rgba(255, 255, 255, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.75);
`

class List extends React.Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
  }

  static contextType = Context

  state = {}

  container = React.createRef()

  mouseDown = event => {
    const container = this.container.current

    if (event.target === container) {
      event.stopPropagation()
      event.preventDefault()
      const y = event.clientY - container.getBoundingClientRect().top
      const { start, end, granularity } = this.context
      const rows = (end - start) * granularity
      const rowHeight = container.offsetHeight / rows

      this.rubberband = {
        y,
        rows,
        rowHeight,
        started: false
      }

      window.addEventListener('mousemove', this.mouseMove)
      window.addEventListener('mouseup', this.mouseUp)
    }
  }

  mouseMove = event => {
    if (!this.rubberband) return

    const { started, y, rowHeight } = this.rubberband
    const offsetY =
      event.clientY - this.container.current.getBoundingClientRect().top

    if (started || Math.abs(offsetY - y) > 10) {
      const [start, end] = [y, offsetY]
        .map(offset => Math.floor(offset / rowHeight))
        .sort((a, b) => a - b)
      this.started = true

      this.rubberbandSelect(start, end)
    }
  }

  rubberbandSelect = (start, end) => {
    const { rubberband: old } = this.state
    if (!old || start !== old.start || end !== old.end) {
      this.setState({ rubberband: { start, end } })
    }
  }

  mouseUp = () => {
    window.removeEventListener('mousemove', this.mouseMove)
    window.removeEventListener('mouseup', this.mouseUp)
    if (this.state.rubberband) {
      const { start, end } = this.state.rubberband
      this.props.onSelect(start, end)
    }
    this.setState({ rubberband: false })
  }

  render() {
    const { children, ...props } = this.props
    const { rubberband } = this.state
    const { start, end, scale, granularity } = this.context
    const rows = (end - start) * granularity

    return (
      <StyledList
        ref={this.container}
        scale={scale}
        granularity={granularity}
        data-rows={rows}
        onMouseDown={this.mouseDown}
        {...props}
      >
        {children}
        {rubberband && (
          <Selection
            data-start={rubberband.start}
            data-height={rubberband.end - rubberband.start + 1}
          />
        )}
      </StyledList>
    )
  }
}

export default List
