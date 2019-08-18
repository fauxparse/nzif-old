import moment from 'lib/moment'
import { v4 as uuid } from 'uuid'

const dummyActivity = (date) => ({
  id: uuid(),
  type: 'workshop',
  name: 'Example activity',
  slug: 'example',
  url: '/',
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
  return days.map(day => ({
    date: day.toISOString(),
    activities: new Array(3).fill(0).map(() => dummyActivity(day)),
  }))
}
