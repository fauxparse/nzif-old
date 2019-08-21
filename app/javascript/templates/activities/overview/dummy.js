import moment from 'lib/moment'
import sortBy from 'lodash/sortBy'
import { address, lorem, image, name, random } from 'faker'

const dummyActivity = (date, index) => {
  const imageId = `/${index % 10 + 1}`
  const presenterCount = index % 10 ? 1 : 2

  return {
    id: random.uuid(),
    sessionId: random.uuid(),
    type: 'workshop',
    name: lorem.sentence().replace(/\.$/, ''),
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
      thumbnail: image.abstract(384, 216) + imageId,
      small: image.abstract(768, 432) + imageId,
      medium: image.abstract(960, 540) + imageId,
      full: image.abstract(1920, 1080) + imageId,
    }
  }
}

export default () => {
  const days = new Array(5).fill(0).map((_, i) =>
    moment()
      .startOf('day')
      .add(i, 'days')
  );
  return days.map((day, i) => ({
    date: day.toISOString(),
    activities: sortBy(
      new Array(4).fill(0).map((_, j) => dummyActivity(day, i * 4 + j)),
      [({ name }) => name]
    )
  }));
};
