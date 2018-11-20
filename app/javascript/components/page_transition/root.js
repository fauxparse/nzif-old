import React, { Fragment } from 'react'
import PageTransition from './group'
import none from './none'
import fade from './fade'
import flip from './flip'
import popOver from './pop_over'

const GROUPS = [
  ['login', /^(login|signup)/],
  ['admin', /^admin/],
  ['misc', /.*/],
]

const TRANSITIONS = {
  misc: {
    admin: flip,
    login: popOver,
  },
  login: {
    misc: popOver,
  },
  admin: {
    misc: flip,
  },
}

const findGroup = (key) =>
  GROUPS.find(([_name, ...patterns]) => patterns.find(pattern => pattern.test(key)))[0]

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
        <PageTransition pageKey={pageKey} {...transition}>
          {children}
        </PageTransition>
      </Fragment>
    )
  }
}

export default RootPageTransition
