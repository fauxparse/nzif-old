import { createContext, useContext } from 'react'

export const FestivalContext = createContext({})

export const useFestival = () => useContext(FestivalContext)

export default FestivalContext
