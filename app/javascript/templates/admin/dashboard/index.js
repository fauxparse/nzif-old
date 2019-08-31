import React from 'react'
import Registrations from './panels/registrations'

import './index.scss'

const Dashboard = ({ children }) => {
  return (
    <section className="dashboard">
      <Registrations />
    </section>
  )
}

export default Dashboard
