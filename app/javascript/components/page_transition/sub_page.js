import React from 'react'
import PageTransition from './group'
import none from './none'
import { left, right } from './slide'
import fade from './fade'

const isPrefix = (a, b) => b.substring(0, a.length) === a

export default class RootPageTransition extends React.Component {
  state = { pageKey: '', transition: none }

  static getDerivedStateFromProps({ pageKey }, state) {
    if (pageKey !== state.pageKey) {
      const oldPath = state.pageKey.replace(/\/$/, '')
      const newPath = pageKey.replace(/\/$/, '')

      const transition = isPrefix(oldPath, newPath)
        ? left
        : isPrefix(newPath, oldPath)
          ? right
          : fade

      return { pageKey, transition }
    }

    return {}
  }

  render() {
    const { pageKey, children } = this.props
    const { transition } = this.state

    return (
      <PageTransition pageKey={pageKey} {...transition}>
        {children}
      </PageTransition>
    )
  }
}
