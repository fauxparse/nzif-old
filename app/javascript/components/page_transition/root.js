import React, { Fragment } from 'react'
import styled from 'styled-components'
import PageTransition from './group'
import none from './none'
import fade from './fade'
import { push, pop } from './push'
import popOver from './pop_over'

const GROUPS = [
  ['login', /^(login|signup)/],
  ['admin', /^admin/],
  ['misc', /.*/],
]

const TRANSITIONS = {
  misc: {
    admin: push,
    login: popOver,
  },
  login: {
    admin: popOver,
    misc: popOver,
  },
  admin: {
    login: popOver,
    misc: pop,
  },
}

const findGroup = (key) =>
  GROUPS.find(([_name, ...patterns]) => patterns.find(pattern => pattern.test(key)))[0]

const TransitionContainer = styled.div`
  background: ${({ theme }) => `linear-gradient(to bottom, ${theme.colors.grey(100)}, ${theme.colors.grey(200)})`};
`

class RootPageTransition extends React.Component {
  state = { pageKey: '', transition: none }

  static getDerivedStateFromProps({ pageKey }, state) {
    if (pageKey !== state.pageKey) {
      const oldGroup = findGroup(state.pageKey)
      const newGroup = findGroup(pageKey)

      return { pageKey, transition: TRANSITIONS[oldGroup][newGroup] || fade }
    }

    return {}
  }

  render() {
    const { pageKey, children } = this.props
    const { transition } = this.state

    return (
      <Fragment>
        <PageTransition pageKey={pageKey} {...transition} component={TransitionContainer}>
          {children}
        </PageTransition>
      </Fragment>
    )
  }
}

export default RootPageTransition
