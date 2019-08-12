import { v4 as uuid } from 'uuid'
import moment from 'lib/moment'

export default () => ({
  id: uuid(),
  name: 'Example activity',
  slug: 'example-activity',
  type: 'workshop',
  sessions: [{
    startsAt: moment().startOf('day').hour(10),
    endsAt: moment().startOf('day').hour(13),
  }],
})
