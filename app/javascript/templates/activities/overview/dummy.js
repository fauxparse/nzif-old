import moment from 'lib/moment'
import flatten from 'lodash/flatten'
import { v4 as uuid } from 'uuid'

const dummyActivity = (date) => ({
  id: uuid(),
  type: 'workshop',
  name: 'Example activity',
  presenters: [{
    name: 'Laura Mipsum',
    origin: 'Wellington',
  }],
  startsAt: date.clone().hour(10),
  endsAt: date.clone().hour(13),
  levels: ['beginner'],
})

export default () => {
  const days = new Array(5).fill(0).map((_, i) => moment().startOf('day').add(i, 'days'))
  return flatten(days.map(day => new Array(4).fill(0).map(() => dummyActivity(day))))
}
