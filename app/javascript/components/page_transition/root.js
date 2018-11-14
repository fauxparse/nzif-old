import React, { Fragment } from 'react'
import PageTransition from './group'
import none, { Styles as NoStyles } from './none'
import fade, { Styles as FadeStyles } from './fade'
import { left, right, Styles as SlideStyles } from './slide'

const GROUPS = [
  ['login', /^login/],
  ['misc', /.*/],
]

const TRANSITIONS = {
  misc: {
    login: left,
  },
  login: {
    misc: right,
  },
}

const findGroup = (key) =>
  GROUPS.find(([_name, ...patterns]) => patterns.find(pattern => pattern.test(key)))[0]

export default class RootPageTransition extends React.Component {
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
        <SlideStyles />
        <PageTransition pageKey={pageKey} {...transition}>
          {children}
        </PageTransition>
      </Fragment>
    )
  }
}
