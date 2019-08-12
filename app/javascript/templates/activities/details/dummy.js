import { v4 as uuid } from 'uuid'
import moment from 'lib/moment'

export default () => ({
  id: uuid(),
  name: 'Example activity',
  slug: 'example-activity',
  type: 'workshop',
  description: 'Without any sugar. What’s with the life preserver? Alright kid, you stick to your father like glue and make sure that he takes her to the dance. C’mon, Mom, make it fast, I’ll miss my bus.  Hey see you tonight, Pop. Woo, time to change that oil. No no no, Doc, I just got here, okay, Jennifer’s here, we’re gonna take the new truck for a spin.\n\nKids, we’re gonna have to eat this cake by ourselves, Uncle Joey didn’t make parole again. I think it would be nice, if you all dropped him a line. Mr. McFly, Mr. McFly, this just arrived, oh hi Marty. I think it’s your new book. Calvin. What? I still don’t understand, how am I supposed to go to the dance with her, if she’s already going to the dance with you.',
  sessions: [{
    id: uuid(),
    startsAt: moment().startOf('day').hour(10),
    endsAt: moment().startOf('day').hour(13),
  }, {
    id: uuid(),
    startsAt: moment().startOf('day').hour(10),
    endsAt: moment().startOf('day').hour(13),
  }],
  presenters: [{
    id: uuid(),
    name: 'Laura Mipsum',
    origin: 'Wellington',
    bio: 'Alright, punk, now- The only way we’re gonna get those two to successfully meet is if they’re alone together. So you’ve got to get your father and mother to interact at some sort of social- I have to tell you about the future. Right, and where am I gonna be? Doc, Doc. Oh, no. You’re alive. Bullet proof vest, how did you know, I never got a chance to tell you. About all that talk about screwing up future events, the space time continuum.',
  }],
})
