import React from 'react'
import PropTypes from 'prop-types'
import Context from './context'
import { Move, Resize, Select } from './drag_manager'

class DragDrop extends React.Component {
  static propTypes = {
    onMove: PropTypes.func.isRequired,
    onResize: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
  }

  static contextType = Context

  state = {
    selection: undefined,
    selectedId: undefined,
  }

  mouseDown = (event) => {
    const { onResize, onSelect } = this.props
    const { target, clientY } = event
    const draggable = target.closest('[draggable]')

    if (draggable) {
      if (clientY > draggable.getBoundingClientRect().bottom - 8) {
        new Resize(this.context, draggable)
          .on('move', this.resize)
          .on('start', this.start)
          .on('resize', onResize)
          .on('cancel', this.cancelResizing)
          .on('stop', this.stopResizing)
          .on('stop', this.stop)
          .start(event)
      }
    } else {
      const list = target.closest('[data-day]')
      if (target == list) {
        new Select(this.context, list)
          .on('start', 'move', this.select)
          .on('select', onSelect)
          .on('stop', this.stopSelecting)
          .start(event)
      }
    }
  }

  start = (selection) => {
    this.setState({ selection })
  }

  stop = () => {
    this.setState({ selection: undefined })
  }

  dragStart = (event) => {
    new Move(this.context, event.target)
      .on('start', this.start)
      .on('move', this.props.onMove)
      .on('stop', this.stop)
      .start(event)
  }

  resize = (selection) => {
    const { session, start, end } = selection
    session.style.setProperty('grid-row-end', `span ${end - start + 1}`)
    this.setState({ selection })
  }

  stopResizing = () => {
    this.setState({ selection: undefined })
  }

  cancelResizing = () => {
    const { session } = this.state.selection
    session.style.removeProperty('grid-row-end')
  }

  select = (selection) => {
    const { selection: old } = this.state
    const { startsAt, endsAt } = selection
    if (!old || !startsAt.isSame(old.startsAt) || !endsAt.isSame(old.endsAt)) {
      this.setState({ selection })
    }
  }

  stopSelecting = () => {
    this.setState({ selection: undefined })
  }

  render() {
    const { selection } = this.state
    const { children } = this.props

    return children({
      selection,
      onMouseDown: this.mouseDown,
      onDragStart: this.dragStart,
    })
  }
}

export default DragDrop
