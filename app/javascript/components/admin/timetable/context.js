import { createContext } from 'react'

export const DEFAULT_CONTEXT = {
  granularity: 4, // quarter-hour slots
  scale: 0.75,    // each slot is 0.75em high
  start: 9,       // start at 9am
  end: 27,        // finish at 3am
}

DEFAULT_CONTEXT.minutesPerSlot = 60 / DEFAULT_CONTEXT.granularity

export default createContext(DEFAULT_CONTEXT)
