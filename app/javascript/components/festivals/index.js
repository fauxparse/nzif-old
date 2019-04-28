import React from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import { Route, Switch } from 'react-router-dom'
import { useQuery } from 'react-apollo-hooks'
import { SubPageTransition as PageTransition } from '../../components/page_transition'
import Header from './header'
import Footer from '../../components/footer'
import Activities from '../activities'
import ActivityDetails from '../activities/activity_details'
import Profile from '../profile'
import Map from '../map'
import Pitches from '../pitches'
import NotFound from '../not_found'
import Home from './home'
import Context from './context'

import { HOMEPAGE_QUERY } from '../../queries/homepage'

export { default as CurrentFestival } from './current'

const Festival = ({ match }) => {
  const { year } = match.params
  const { data = {} } = useQuery(HOMEPAGE_QUERY, { variables: { year } })

  return (
    <Context.Provider value={data.festival}>
      <div className="public-section">
        <Header />

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
                  <Route path={`${match.path}/map`} exact component={Map} />
                  <Route path={`${match.path}/`} exact component={Home} />
                  <Route component={NotFound} />
                </Switch>
              </PageTransition>
            )}
          />
        </div>
        <Footer />
      </div>
    </Context.Provider>
  )
}

Festival.propTypes = {
  match: ReactRouterPropTypes.match.isRequired
}

export default Festival
