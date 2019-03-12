import Presenters from './presenters'
import ActivityDetails from './activity'
import FinishAndSend from './finish_and_send'
import StandaloneWorkshop from './standalone_workshop'
import DirectedPerformance from './directed_performance'
import ExperimentalPerformance from './experimental_performance'

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
    controller: FinishAndSend,
  }
]

export const STEP_NAMES = STEPS.map(({ name }) => name)

export const ACTIVITY_TYPES = [
  {
    name: 'workshop',
    title: 'Standalone workshop',
    description: 'Single 3-hour slot',
    controller: StandaloneWorkshop,
  },
  {
    name: 'directed',
    title: 'Directed performance',
    description: '+ 3-hour workshop',
    controller: DirectedPerformance,
  },
  {
    name: 'experimental',
    title: 'Experimental performance',
    description: '+ 3-hour workshop',
    controller: ExperimentalPerformance,
  },
]
