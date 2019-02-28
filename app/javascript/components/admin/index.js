import React from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import { Route, Switch } from 'react-router-dom'
import classNames from 'classnames'
import ThemeContext from '../../lib/theme_context'
import { SubPageTransition as PageTransition } from '../../components/page_transition'
import Header from './header'
import Dashboard from './dashboard'
import Timetable from './timetable'
import ActivityDetails from './activities/details'
import People from './people'

const getPageKey = path => path.split('/').slice(0, 6).join('/')

const Page = ({ className, children, ...props }) => (
  <main className={classNames('admin__page', className)} {...props}>
    {children}
  </main>
)

const Admin = ({ match }) => (
  <ThemeContext.Provider value='dark'>
    <div className="admin" data-theme='dark'>
      <Header />
      <Route
        render={({ location }) => (
          <PageTransition
            component={Page}
            location={location}
            pageKey={getPageKey(location.pathname)}
          >
            <Switch location={location}>
              <Route path={`${match.path}/activities/:type/:slug`} component={ActivityDetails} />
              <Route path={`${match.path}/activities`} component={Timetable} />
              <Route path={`${match.path}/people`} component={People} />
              <Route path={`${match.path}/`} component={Dashboard} />
            </Switch>
          </PageTransition>
        )}
      />
    </div>
  </ThemeContext.Provider>
)

Admin.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
}

export default Admin
