import React from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import { Route, Switch } from 'react-router-dom'
import { SubPageTransition as PageTransition } from '../../components/page_transition'
import Header from './header'
import Footer from '../../components/footer'
import Activities from '../activities'
import ActivityDetails from '../activities/activity_details'
import Map from '../map'
import Home from './home'

export { default as CurrentFestival } from './current'

class Festival extends React.Component {
  render() {
    const { match } = this.props

    return (
      <div className="public-section">
        <Header />

        <div className="page">
          <Route
            render={({ location }) => (
              <PageTransition
                pageKey={location.pathname}
              >
                <Switch location={location}>
                  <Route path={`${match.path}/:type(shows|workshops)`} render={({ match }) => (
                    <>
                      <Route path={`${match.path}/:slug`} exact component={ActivityDetails} />
                      <Route path={match.path} exact component={Activities} />
                    </>
                  )} />
                  <Route path={`${match.path}/map`} exact component={Map} />
                  <Route path={`${match.path}/`} exact component={Home} />
                </Switch>
              </PageTransition>
            )}
          />
        </div>
        <Footer />
      </div>
    )
  }
}

Festival.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
}

export default Festival
