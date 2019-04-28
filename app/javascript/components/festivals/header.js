import React, { useContext } from 'react'
import Header from '../shared/header'
import Menu from '../shared/menu'
import Context from './context'

const FestivalHeader = () => {
  const festival = useContext(Context)
  const { programmeLaunched, pitchesOpen } = festival || {}

  return (
    <Header>
      {programmeLaunched && (
        <>
          <Menu.Item icon="workshop" text="Workshops" to={`${festival.year}/workshops`} />
          <Menu.Item icon="show" text="Shows" to={`${festival.year}/shows`} />
        </>
      )}
      {pitchesOpen && <Menu.Item icon="pitch" text="Pitches" to={`${festival.year}/pitches`} />}
    </Header>
  )
}

export default FestivalHeader
