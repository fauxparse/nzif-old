import React from 'react'
import styled from 'styled-components'
import LogInForm from './log_in_form'
import Background from '../shared/background'

const LogInPage = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  ${Background} {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  ${LogInForm} {
    background: ${({ theme }) => theme.colors.background};
    position: relative;
  }
`

class LogIn extends React.Component {
  render() {
    return (
      <LogInPage>
        <Background />
        <LogInForm />
      </LogInPage>
    )
  }
}

export default LogIn
