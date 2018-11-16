import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, withRouter } from 'react-router-dom'
import { withLastLocation } from 'react-router-last-location'
import styled from 'styled-components'
import LogInForm from './log_in_form'
import SignUpForm from './sign_up_form'
import LogInPage from './page'

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

class LogIn extends React.Component {
  state = { lastLocation: '/' }

  static getDerivedStateFromProps(props) {
    const { lastLocation } = props

    if (lastLocation) {
      const pathname = lastLocation.pathname || lastLocation
      if (!/^\/(login|signup)/.test(pathname)) {
        return { lastLocation }
      }
    }
    return {}
  }

  close = () => {
    const { history } = this.props
    const { lastLocation } = this.state
    history.push(lastLocation)
  }

  renderLogIn = () => <LogInForm lastLocation={this.state.lastLocation} />

  renderSignUp = () => <SignUpForm lastLocation={this.state.lastLocation} />

  render() {
    return (
      <LogInPage onClose={this.close}>
        <Center>
          <Switch>
            <Route path="/login" render={this.renderLogIn} />
            <Route path="/signup" render={this.renderSignUp} />
          </Switch>
        </Center>
      </LogInPage>
    )
  }
}

LogIn.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  lastLocation: PropTypes.shape({ pathname: PropTypes.string }),
}

LogIn.defaultProps = {
  lastLocation: null,
}

export default withLastLocation(withRouter(LogIn))
