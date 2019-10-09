import React from 'react'
import Registrations from './panels/registrations'
import PanicMode from './panels/panic'

import './index.scss'

const Dashboard = () => (
  <section className="dashboard">
    <Registrations />
    <PanicMode />
  </section>
)

export default Dashboard
