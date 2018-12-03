import React from 'react'
import PropTypes from 'prop-types'
import moment from '../../../lib/moment'
import Context from './context'

class DragDrop extends React.Component {
  static propTypes = {
    onMove: PropTypes.func.isRequired,
  }

  static contextType = Context

  dragStart = (event) => {
    const { target, nativeEvent, dataTransfer } = event
    const { offsetY, clientX: x, clientY: y } = nativeEvent
    const { id, start, height } = target.dataset
    const parent = target.closest('[data-day]')
    const row = parseInt(start, 10)

    dataTransfer.effectAllowed = 'move'
    dataTransfer.setData('id', id)
    dataTransfer.setDragImage(this.customDragImage(), 0, 0)

    this.dragging = {
      item: target,
      dropped: false,
      id,
      x,
      y,
      offsetY,
      originalParent: parent,
      parent,
      row,
      originalRow: row,
      height: parseInt(height, 10),
      rowHeight: parent.offsetHeight / parseInt(parent.dataset.rows, 10),
    }
  }

  dragOver = (event) => {
    const parent = event.nativeEvent.target.closest('[data-day]')
    if (parent) {
      event.preventDefault()
      if (this.dragging && parent !== this.dragging.parent) {
        this.dragging.parent = parent
      }
    }
  }

  drag = (event) => {
    const { clientX: x, clientY: y } = event.nativeEvent
    if (x !== this.dragging.x || y !== this.dragging.y) {
      this.dragged(x, y)
    }
  }

  dragged = (x, y) => {
    const { parent, item, offsetY, height, rowHeight } = this.dragging
    const { top } = parent.getBoundingClientRect()
    const maxRow = parseInt(parent.dataset.rows, 10) - height
    const row = Math.min(maxRow, Math.round(Math.max(y - top - offsetY, 0) / rowHeight))
    if (!parent.contains(item)) {
      parent.appendChild(item)
    }
    item.style.gridRowStart = row + 1
    this.dragging.x = x
    this.dragging.y = y
    this.dragging.row = row
  }

  drop = () => {
    if (this.dragging) {
      const { id, item, parent, originalParent, row } = this.dragging
      const minutesPerRow = 60 / this.context.granularity
      const startTime = moment(parent.dataset.start).add(row * minutesPerRow, 'minutes')
      if (parent !== originalParent) {
        item.style.display = 'none'
        originalParent.appendChild(item)
      }
      this.props.onMove(id, startTime)
      this.dragging.dropped = true
    }
  }

  dragEnd = () => {
    if (this.dragging) {
      const { item, dropped, parent, originalParent, originalRow } = this.dragging
      if (!dropped) {
        item.style.gridRowStart = originalRow + 1
        if (parent !== originalParent) {
          originalParent.appendChild(item)
        }
      }
      this.dragging = false
    }
  }

  customDragImage = () => {
    if (!this._customDragImage) {
      const canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas')
      canvas.width = canvas.height = 0
      this._customDragImage = canvas
    }
    return this._customDragImage
  }

  render() {
    const { children } = this.props
    return React.cloneElement(children, {
      onDragStart: this.dragStart,
      onDragOver: this.dragOver,
      onDrag: this.drag,
      onDrop: this.drop,
      onDragEnd: this.dragEnd,
    })
  }
}

export default DragDrop
