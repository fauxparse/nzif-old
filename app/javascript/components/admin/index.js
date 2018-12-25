import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Route, Switch } from 'react-router-dom'
import { SubPageTransition as PageTransition } from '../../components/page_transition'
import Theme from './theme'
import Header from './header'
import Dashboard from './dashboard'
import Timetable from './timetable'

const AdminLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`

const Page = styled.main`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  position: relative;
`

const Admin = ({ match }) => (
  <Theme>
    <AdminLayout>
      <Header />
      <Route
        render={({ location }) => (
          <PageTransition component={Page} pageKey={location.pathname}>
            <Switch location={location}>
              <Route path={`${match.path}/timetable`} component={Timetable} />
              <Route path={`${match.path}/`} exact component={Dashboard} />
            </Switch>
          </PageTransition>
        )}
      />
    </AdminLayout>
  </Theme>
)

Admin.propTypes = {
  match: PropTypes.shape({ path: PropTypes.string.isRequired }).isRequired,
}

export default Admin
