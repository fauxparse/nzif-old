import Presenters from './presenters'
import ActivityDetails from './activity'
import Availability from './availability'
import FinishAndSend from './finish_and_send'
import StandaloneWorkshop from './standalone_workshop'
import KidsPerformance from './kids_performance'
import MiniSeason from './mini_season'
import DirectedPerformance from './directed_performance'

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
    name: 'availability',
    title: 'Your availability',
    icon: 'calendar',
    controller: Availability,
  },
  {
    name: 'finish',
    title: 'Finish & send',
    icon: 'send',
    controller: FinishAndSend,
  }
]

export const STEP_NAMES = STEPS.map(({ name }) => name)

export const ACTIVITY_TYPES = [
  {
    name: 'young',
    category: 'Performance',
    title: 'Improv for young audiences',
    description: 'Daytime children’s show',
    controller: KidsPerformance,
  },
  {
    name: 'directed',
    category: 'Performance',
    title: 'New works',
    description: '+ 3-hour workshop',
    controller: DirectedPerformance,
  },
  {
    name: 'season',
    category: 'Performance',
    title: 'Mini season',
    description: 'Existing work',
    controller: MiniSeason,
  },
  {
    name: 'workshop',
    category: 'Workshops',
    title: 'Standalone workshop',
    description: 'Single 3-hour slot',
    controller: StandaloneWorkshop,
  },
]
