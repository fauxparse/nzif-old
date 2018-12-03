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
    onResize: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
  }

  static contextType = Context

  state = {}

  container = React.createRef()

  mouseDown = (event) => {
    const container = this.container.current
    const draggable = event.target.closest('[draggable]')

    if (draggable) {
      if (event.clientY > draggable.getBoundingClientRect().bottom - 8) {
        this.resizeStart(event)
      }
    } else if (event.target === container) {
      this.rubberbandStart(event)
    }
  }

  resizeStart = (event) => {
    event.preventDefault()
    event.stopPropagation()

    const container = this.container.current
    const { start, end, granularity } = this.context
    const rows = (end - start) * granularity
    const rowHeight = container.offsetHeight / rows
    const session = event.target.closest('[draggable]')
    const startRow = parseInt(session.dataset.start, 10)
    const id = session.dataset.id

    this.resizing = {
      id,
      session,
      start: startRow,
      rowHeight,
    }

    window.addEventListener('mousemove', this.resizeMove)
    window.addEventListener('mouseup', this.resizeStop)
    window.addEventListener('keydown', this.resizeCancel)
  }

  resizeMove = (event) => {
    const container = this.container.current
    const y = event.clientY - container.getBoundingClientRect().top
    const { session, start, rowHeight } = this.resizing
    const row = Math.max(start, Math.round(y / rowHeight))

    this.resizing.row = row
    session.style.gridRowEnd = row + 1
  }

  resizeStop = () => {
    const { id, session, cancelled, start, row } = this.resizing

    if (!cancelled && row !== undefined) {
      this.props.onResize(id, start, row - 1)
    }

    session.style.removeProperty('grid-row-end')
    this.resizing = false

    window.removeEventListener('mousemove', this.resizeMove)
    window.removeEventListener('mouseup', this.resizeStop)
    window.removeEventListener('keydown', this.resizeCancel)
  }

  resizeCancel = (event) => {
    if (event.which == 27) {
      this.resizing.cancelled = true
      event.preventDefault()
      this.resizeStop()
    }
  }

  rubberbandStart = (event) => {
    event.stopPropagation()
    event.preventDefault()

    const container = this.container.current
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

    window.addEventListener('mousemove', this.rubberbandMove)
    window.addEventListener('mouseup', this.rubberbandStop)
    window.addEventListener('keydown', this.rubberbandCancel)
  }

  rubberbandMove = (event) => {
    if (!this.rubberband) return

    const { started, y, rowHeight } = this.rubberband
    const offsetY =
      event.clientY - this.container.current.getBoundingClientRect().top

    if (started || Math.abs(offsetY - y) > 10) {
      const [start, end] = [y, offsetY]
        .map(offset => Math.floor(offset / rowHeight))
        .sort((a, b) => a - b)
      this.rubberband.started = true
      this.rubberbandSelect(start, end)
    }
  }

  rubberbandSelect = (start, end) => {
    const { rubberband: old } = this.state
    if (!old || start !== old.start || end !== old.end) {
      this.setState({ rubberband: { start, end } })
    }
  }

  rubberbandStop = () => {
    if (this.state.rubberband) {
      const { start, end } = this.state.rubberband
      this.props.onSelect(start, end)
      this.setState({ rubberband: false })
    }

    window.removeEventListener('mousemove', this.rubberbandMove)
    window.removeEventListener('mouseup', this.rubberbandStop)
    window.removeEventListener('keydown', this.rubberbandCancel)
  }

  rubberbandCancel = (event) => {
    if (event.which == 27) {
      this.setState({ rubberband: false })
      event.preventDefault()
      this.rubberbandStop()
    }
  }

  render() {
    const { children, onSelect, onResize, ...props } = this.props
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
