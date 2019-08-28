import React from 'react'
import { useFestival } from 'contexts/festival'
import Template from 'templates/home'

const Home = () => {
  const festival = useFestival()

  return (
    <Template festival={festival} />
  )
}

export default Home
