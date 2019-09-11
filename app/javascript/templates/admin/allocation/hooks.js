import { useCallback, useReducer } from 'react'

const move = (state, { time, source, destination, sourceIndex, destinationIndex }) => {
  const sourceList = [...state[time][source]]
  const destinationList = (source === destination) ? sourceList : [...state[time][destination]]
  const [allocation] = sourceList.splice(sourceIndex, 1)
  destinationList.splice(destinationIndex, 0, allocation)
  return {
    ...state,
    [time]: {
      ...state[time],
      [source]: sourceList,
      [destination]: destinationList,
    }
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'reset':
      return action.newState
    case 'move':
      return move(state, action)
    default:
      return state
  }
}

export const useAllocations = (allocations) => {
  const [state, dispatch] = useReducer(reducer, allocations)

  const move = useCallback((move) => dispatch({ type: 'move', ...move }), [dispatch])

  const reset = useCallback((newState) => dispatch({ type: 'reset', newState }), [dispatch])

  return [state, move, reset]
}
