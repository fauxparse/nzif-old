import React, { useCallback, useState } from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import { Route, Switch } from 'react-router-dom'
import { useQuery } from 'react-apollo-hooks'
import classNames from 'classnames'
import Helmet from 'react-helmet'
import DetectLocationChange from 'lib/detect_location_change'
import ThemeContext from 'lib/theme_context'
import { HOMEPAGE_QUERY } from 'queries/homepage'
import Context from 'contexts/festival'
import Loader from 'atoms/loader'
import { SubPageTransition as PageTransition } from '../../components/page_transition'
import Header from './header'
import Sidebar from './sidebar'
import Timetable from './timetable'
import People from './people'
import Person from './people/details'
import Content from './content'
import Dashboard from 'pages/admin/dashboard'
import Pitches from 'pages/admin/pitches'
import Registrations from 'pages/admin/registrations'
import Allocation from 'pages/admin/allocation'
import EditActivity from 'pages/admin/activities/edit'
import Payments from 'pages/admin/payments'
import Venues from 'pages/admin/venues'
import History from 'pages/admin/history'
import NotFound from 'templates/not_found'
import Profile from '../profile'

const getPageKey = path => path.split('/').slice(0, 6).join('/')

const Page = ({ className, children, ...props }) => (
  <main className={classNames('admin__page', className)} {...props}>
    {children}
  </main>
)

const Admin = ({ match, history }) => {
  const { year } = match.params

  const { loading, data = {} } = useQuery(HOMEPAGE_QUERY, { variables: { year } })

  const { festival } = data

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
    <ThemeContext.Provider value='dark'>
      {loading ? <Loader /> : (
        <Context.Provider value={festival || { year }}>
          <div className="admin" data-theme='dark'>
            <Header
              menuOpen={sidebarOpen}
              onLogin={logIn}
              onHamburgerClick={toggleSidebar}
            />

            <Helmet>
              <title>{`NZIF ${year} Admin`}</title>
            </Helmet>

            <Route
              render={({ location }) => (
                <PageTransition
                  component={Page}
                  location={location}
                  pageKey={getPageKey(location.pathname)}
                >
                  <Switch location={location}>
                    <Route
                      path={`${match.path}/activities/:type/:slug/:tab?`}
                      component={EditActivity}
                    />
                    <Route path={`${match.path}/activities`} exact component={Timetable} />
                    <Route path={`${match.path}/people/:id`} exact component={Person} />
                    <Route path={`${match.path}/people`} exact component={People} />
                    <Route path={`${match.path}/profile`} exact component={Profile} />
                    <Route path={`${match.path}/content`} component={Content} />
                    <Route path={`${match.path}/pitches`} component={Pitches} />
                    <Route path={`${match.path}/registrations`} component={Registrations} />
                    <Route path={`${match.path}/payments`} component={Payments} />
                    <Route path={`${match.path}/venues`} component={Venues} />
                    <Route path={`${match.path}/history`} component={History} />
                    <Route path={`${match.path}/allocation`} component={Allocation} />
                    <Route path={`${match.path}/`} exact component={Dashboard} />
                    <Route component={NotFound} />
                  </Switch>
                </PageTransition>
              )}
            />

            <Sidebar
              festival={festival}
              open={sidebarOpen}
              onClickOutside={closeSidebar}
            />
          </div>
          <DetectLocationChange onChange={locationChanged} />
        </Context.Provider>
      )}
    </ThemeContext.Provider>
  )
}

Admin.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
}

export default Admin
