import moment from '../../../lib/moment'

class DragManager {
  constructor(context) {
    this.context = context
    this.callbacks = {}
  }

  on(...args) {
    const callback = args.pop()
    args.forEach(event => this.callbacks[event] = [...(this.callbacks[event] || []), callback])
    return this
  }

  publish(eventName, ...args) {
    Array.from(this.callbacks[eventName] || []).forEach(fn => fn && fn(...args))
    return this
  }

  rowToTime = row =>
    this.startsAt.clone().add(row * 60 / this.context.granularity, 'minutes')

  cancel = (event) => {
    if (event.which == 27) {
      event.preventDefault()
      this.active = false
      this.publish('cancel')
      this.stop()
    }
  }
}

export class Move extends DragManager {
  constructor(context, session) {
    super(context)

    const { id, height } = session.dataset
    const { start, end, granularity } = context

    this.session = session
    this.id = id
    this.parent = this.originalParent = session.closest('[data-day]')
    this.container = session.closest('section')
    this.rows = (end - start) * granularity
    this.rowHeight = this.parent.offsetHeight / this.rows
    this.row = this.originalRow = parseInt(session.dataset.start, 10)
    this.height = parseInt(height, 10)
    this.maxRow = this.rows - this.height
  }

  rowToTime = row => {
    return moment(this.parent.dataset.start).add(row * 60 / this.context.granularity, 'minutes')
  }

  selection = () => {
    const startsAt = this.rowToTime(this.row)
    const endsAt = this.rowToTime(this.row + this.height)

    return {
      id: this.id,
      start: this.row,
      end: this.row + this.height,
      startsAt,
      endsAt,
    }
  }

  start = (event) => {
    const { nativeEvent, dataTransfer } = event
    const { offsetY, clientX, clientY } = nativeEvent

    dataTransfer.effectAllowed = 'move'
    dataTransfer.setData('id', this.id)
    dataTransfer.setDragImage(this.customDragImage(), 0, 0)

    this.x = clientX
    this.y = clientY
    this.offsetY = offsetY

    this.session.setAttribute('aria-grabbed', true)
    this.container.addEventListener('drag', this.move)
    this.container.addEventListener('dragover', this.over)
    this.container.addEventListener('drop', this.drop)
    this.container.addEventListener('dragend', this.stop)

    this.publish('start', this.selection())
  }

  move = (event) => {
    const { clientX: x, clientY: y } = event
    if (x !== this.x || y !== this.y) {
      const { top } = this.parent.getBoundingClientRect()
      const row =
        Math.max(0, Math.min(this.maxRow, Math.round((y - top - this.offsetY) / this.rowHeight)))
      if (!this.parent.contains(this.session)) {
        this.parent.appendChild(this.session)
      }
      this.session.style.setProperty('grid-row-start', row + 1)
      this.x = x
      this.y = y
      this.row = row
    }
  }

  over = (event) => {
    const parent = event.target.closest('[data-day]')
    if (parent) {
      event.preventDefault()
      if (parent !== this.parent) {
        this.parent = parent
      }
    }
  }

  drop = () => {
    if (this.parent !== this.originalParent) {
      this.session.style.display = 'none'
      this.originalParent.appendChild(this.session)
    }
    this.publish('move', this.selection())
    this.dropped = true
    this.unbind()
    this.publish('stop')
  }

  stop = () => {
    if (!this.dropped) {
      this.session.style.removeProperty('grid-row-start')
      if (this.parent !== this.originalParent) {
        this.originalParent.appendChild(this.session)
      }
    }
    this.unbind()
  }

  unbind = () => {
    this.session.removeAttribute('aria-grabbed')
    this.container.removeEventListener('drag', this.move)
    this.container.removeEventListener('dragover', this.over)
    this.container.removeEventListener('drop', this.drop)
    this.container.removeEventListener('dragend', this.stop)
  }

  customDragImage = () => {
    const canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas')
    canvas.width = canvas.height = 0
    return canvas
  }
}

export class Resize extends DragManager {
  constructor(context, session) {
    super(context)

    const { start, end, granularity } = context
    this.session = session
    this.id = session.dataset.id
    this.list = session.closest('[data-day]')
    this.rows = (end - start) * granularity
    this.rowHeight = this.list.offsetHeight / this.rows
    this.startsAt = moment(this.list.dataset.day).set('hour', start)
    this.startRow = parseInt(session.dataset.start, 10)
  }

  start = (event) => {
    event.stopPropagation()
    event.preventDefault()

    this.active = false

    window.addEventListener('mousemove', this.move)
    window.addEventListener('mouseup', this.stop)
    window.addEventListener('keydown', this.cancel)
    window.addEventListener('click', this.click, { capture: true })

    this.publish('start', this.selection())
  }

  selection = () => {
    const start = this.startRow
    const end = this.row

    return {
      id: this.id,
      session: this.session,
      start,
      end,
      startsAt: this.rowToTime(start),
      endsAt: this.rowToTime(end + 1),
    }
  }

  move = (event) => {
    const y = event.clientY - this.list.getBoundingClientRect().top
    this.row = Math.max(this.startRow, Math.floor(y / this.rowHeight))
    this.active = true
    this.publish('move', this.selection())
  }

  stop = () => {
    if (this.active) {
      this.publish('resize', this.selection())
    }

    setTimeout(() => {
      window.removeEventListener('mousemove', this.move)
      window.removeEventListener('mouseup', this.stop)
      window.removeEventListener('keydown', this.cancel)
      window.removeEventListener('click', this.click)
      this.active = false
    })

    this.publish('stop')
  }

  click = (e) => {
    if (this.active) {
      e.preventDefault()
      e.stopPropagation()
    }
  }
}

export class Select extends DragManager {
  constructor(context, list) {
    super(context)

    const { start, end, granularity } = context
    this.list = list
    this.rows = (end - start) * granularity
    this.rowHeight = list.offsetHeight / this.rows
    this.startsAt = moment(list.dataset.day).set('hour', start)
  }

  selection = () => {
    const [start, end] = this._selection
    return {
      start,
      end,
      startsAt: this.rowToTime(start),
      endsAt: this.rowToTime(end + 1),
    }
  }

  start = (event) => {
    event.stopPropagation()
    event.preventDefault()

    this.y = event.clientY - this.list.getBoundingClientRect().top
    this.active = false

    window.addEventListener('mousemove', this.move)
    window.addEventListener('mouseup', this.stop)
    window.addEventListener('keydown', this.cancel)
  }

  move = (event) => {
    const y = event.clientY - this.list.getBoundingClientRect().top

    if (this.active || Math.abs(y - this.y) > 8) {
      this._selection = [y, this.y]
        .map(offset => Math.floor(offset / this.rowHeight))
        .sort((a, b) => a - b)

      if (!this.active) {
        this.active = true
        this.publish('start', this.selection())
      }

      this.publish('move', this.selection())
    }
  }

  stop = () => {
    if (this.active) {
      this.publish('select', this.selection())
      this.active = false
    }

    window.removeEventListener('mousemove', this.move)
    window.removeEventListener('mouseup', this.stop)
    window.removeEventListener('keydown', this.cancel)

    this.publish('stop')
  }
}
