import React from 'react'
import Registrations from './panels/registrations'
import Reports from './panels/reports'
import PanicMode from './panels/panic'

import './index.scss'

const Dashboard = () => (
  <section className="dashboard">
    <Registrations />
    <Reports />
    <PanicMode />
  </section>
)

export default Dashboard
