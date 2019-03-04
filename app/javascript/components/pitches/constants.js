import Presenters from './presenters'
import ActivityDetails from './activity'

export const STEPS = [
  {
    name: 'presenters',
    title: 'About you',
    icon: 'user',
    controller: Presenters,
  },
  {
    name: 'activity',
    title: 'Your idea',
    icon: 'pitch',
    controller: ActivityDetails,
  },
  {
    name: 'finish',
    title: 'Finish & send',
    icon: 'send',
  }
]

export const STEP_NAMES = STEPS.map(({ name }) => name)

export const ACTIVITY_TYPES = [
  {
    name: 'workshop',
    title: 'Standalone workshop',
    description: 'Single 3-hour slot',
    lookingFor: `
Well-structured workshops with clear aims and outcomes, offering one of the following:

* Targeted scene work or skill development
* New approaches to improvisation
* Associated performance or presentation skills: mime, dance, scenography, other
* Company specific expertise in a shareable form
* Something new we haven't thought of!

[Check out this blog post](http://nzimprovfestival.co.nz/news/2018/6/5/ten-years-of-moments-nzif-2018) for more about what we're after (and what we can offer you).
    `,
  },
  {
    name: 'directed',
    title: 'Directed performance',
    description: '+ 3-hour workshop',
    lookingFor: `
* 50–75 minute performances for a black box theatre (the Heyday Dome or Propeller Stage at BATS) led by one or two directors
* Recently developed shows that have not been performed at NZIF previously, that would suit intermediate improvisors
* An accompanying workshop teaching participants the relevant skills and techniques needed (from which you will cast the performance)

[Check out this blog post](http://nzimprovfestival.co.nz/news/2018/6/5/ten-years-of-moments-nzif-2018) for more about what we're after (and what we can offer you).
    `
  },
  {
    name: 'experimental',
    title: 'Experimental performance',
    description: '+ 3-hour workshop',
    lookingFor: `
* 50–75 minute performances for a black box theatre (the Heyday Dome or Propeller Stage at BATS) led by one or two directors
* Experimental show concepts that you can workshop with experienced improvisors and present at NZIF
* An accompanying workshop teaching participants the relevant skills and techniques needed (from which you will cast the performance)

[Check out this blog post](http://nzimprovfestival.co.nz/news/2018/6/5/ten-years-of-moments-nzif-2018) for more about what we're after (and what we can offer you).
    `
  },
  {
    name: 'showcase',
    title: 'Showcase performance',
    description: 'Bring a whole show',
    lookingFor: `
* 50–75 minute performances by existing companies or ensembles
* The ability to rehearse to a high standard

[Check out this blog post](http://nzimprovfestival.co.nz/news/2018/6/5/ten-years-of-moments-nzif-2018) for more about what we're after (and what we can offer you).
    `
  },
]
