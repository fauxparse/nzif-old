import React, { useState, useCallback } from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import { Route, Switch } from 'react-router-dom'
import { useQuery } from 'react-apollo-hooks'
import Context from 'contexts/festival'
import { SubPageTransition as PageTransition } from '../../components/page_transition'
import Header from './header'
import Sidebar from './sidebar'
import Activities from '../activities'
import ActivityDetails from '../activities/activity_details'
import Profile from '../profile'
import Map from '../map'
import Pitches from '../pitches'
import StaticContent from '../static_content'
import NotFound from '../not_found'
import Home from './home'
import DetectLocationChange from 'lib/detect_location_change'

import { HOMEPAGE_QUERY } from '../../queries/homepage'

export { default as CurrentFestival } from './current'

const Festival = ({ match, history }) => {
  const { year } = match.params
  const { data = {} } = useQuery(HOMEPAGE_QUERY, { variables: { year } })

  const logIn = useCallback(() => {
    history.push('/login')
  }, [history])

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(!sidebarOpen)
  }, [sidebarOpen, setSidebarOpen])

  const closeSidebar = useCallback((e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    setSidebarOpen(false)
  }, [setSidebarOpen])

  const locationChanged = useCallback(() => {
    if (sidebarOpen) {
      setSidebarOpen(false)
    }
  }, [sidebarOpen, setSidebarOpen])

  return (
    <Context.Provider value={data.festival}>
      <div className="public-section">
        <Header
          menuOpen={sidebarOpen}
          onLogin={logIn}
          onHamburgerClick={toggleSidebar}
        />

        <div className="page">
          <Route
            render={({ location }) => (
              <PageTransition pageKey={location.pathname}>
                <Switch location={location}>
                  <Route
                    path={`${match.path}/:type(shows|workshops)`}
                    render={({ match }) => (
                      <>
                        <Route path={`${match.path}/:slug`} exact component={ActivityDetails} />
                        <Route path={match.path} exact component={Activities} />
                      </>
                    )}
                  />
                  <Route path={`${match.path}/profile`} exact component={Profile} />
                  <Route path={`${match.path}/pitches`} component={Pitches} />
                  <Route path={`${match.path}/map`} component={Map} />
                  <Route path={`${match.path}/`} exact component={Home} />
                  <Route path={`${match.path}/:slug`} exact component={StaticContent} />
                  <Route component={NotFound} />
                </Switch>
              </PageTransition>
            )}
          />
        </div>

        <Sidebar
          festival={data.festival}
          open={sidebarOpen}
          onClickOutside={closeSidebar}
        />
        <DetectLocationChange onChange={locationChanged} />
      </div>
    </Context.Provider>
  )
}

Festival.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
}

export default Festival
