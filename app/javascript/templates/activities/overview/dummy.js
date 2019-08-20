import moment from 'lib/moment'
import { address, lorem, image, name, random } from 'faker'

const dummyActivity = (date) => {
  const imageURL = image.animals(undefined, undefined, true)
  const presenterCount = Math.random() < 0.1 ? 2 : 1

  return {
    id: random.uuid(),
    type: 'workshop',
    name: lorem.sentence(),
    slug: lorem.slug(),
    url: '/',
    presenters: new Array(presenterCount).fill(true).map(() => ({
      name: name.findName(),
      origin: address.city(),
    })),
    startsAt: date.clone().hour(10),
    endsAt: date.clone().hour(13),
    levels: ['beginner'],
    image: {
      thumbnail: imageURL,
      small: imageURL,
      medium: imageURL,
      full: imageURL,
    }
  }
}

export default () => {
  const days = new Array(5).fill(0).map((_, i) => moment().startOf('day').add(i, 'days'))
  return days.map(day => ({
    date: day.toISOString(),
    activities: new Array(3).fill(0).map(() => dummyActivity(day)),
  }))
}
