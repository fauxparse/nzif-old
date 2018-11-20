import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Route, Switch } from 'react-router-dom'
import { SubPageTransition as PageTransition } from '../../components/page_transition'
import Header from '../../components/shared/header'
import Footer from '../../components/shared/footer'
import Activities from '../activities'
import Home from './home'

export { default as CurrentFestival } from './current'

const Container = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
`

const Page = styled.main`
  flex: 1 0 auto;
  position: relative;
`

class Festival extends React.Component {
  page = React.createRef()

  pageEnter = node => {
    if (node) {
      this.page.current.style.minHeight = `${node.offsetHeight}px`
    }
  }

  pageEntered = _node => {
    this.page.current.style.height = 'auto'
  }

  render() {
    const { match } = this.props

    return (
      <Container>
        <Header />

        <Page ref={this.page}>
          <Route
            render={({ location }) => (
              <PageTransition
                pageKey={location.pathname}
                onEnter={this.pageEnter}
                onEntered={this.pageEntered}
              >
                <Switch location={location}>
                  <Route
                    path={`${match.path}/:type(shows|workshops)`}
                    exact
                    component={Activities}
                  />
                  <Route path={`${match.path}/`} exact component={Home} />
                </Switch>
              </PageTransition>
            )}
          />
        </Page>
        <Footer />
      </Container>
    )
  }
}

Festival.propTypes = {
  match: PropTypes.shape({ path: PropTypes.string.isRequired }).isRequired,
}

export default Festival
