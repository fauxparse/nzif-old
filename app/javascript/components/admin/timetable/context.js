import { createContext } from 'react'

export const DEFAULT_CONTEXT = {
  granularity: 4, // quarter-hour slots
  scale: 0.75,    // each slot is 0.75em high
  start: 9,       // start at 9am
  end: 27,        // finish at 3am
}

export default createContext(DEFAULT_CONTEXT)
