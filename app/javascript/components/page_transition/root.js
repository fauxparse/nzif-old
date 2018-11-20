import React, { Fragment } from 'react'
import PageTransition from './group'
import none, { Styles as NoStyles } from './none'
import fade, { Styles as FadeStyles } from './fade'
import flip, { Styles as FlipStyles } from './flip'
import popOver, { Styles as PopOverStyles } from './pop_over'
import { Styles as SlideStyles } from './slide'

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
        <NoStyles />
        <FadeStyles />
        <FlipStyles />
        <SlideStyles />
        <PopOverStyles />
        <PageTransition pageKey={pageKey} {...transition}>
          {children}
        </PageTransition>
      </Fragment>
    )
  }
}

export default RootPageTransition
