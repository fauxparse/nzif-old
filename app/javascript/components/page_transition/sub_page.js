import React from 'react'
import PropTypes from 'prop-types'
import ReactRouterPropTypes from 'react-router-prop-types'
import PageTransition from './group'
import none from './none'
import { left, right } from './slide'
import fade from './fade'

const isPrefix = (a, b) => b.substring(0, a.length) === a

export default class SubPageTransition extends React.Component {
  static propTypes = {
    location: ReactRouterPropTypes.location,
    pageKey: PropTypes.string,
  }

  state = { pageKey: this.props.pageKey || '', transition: none }

  static getDerivedStateFromProps({ pageKey, location }, state) {
    const { state: locationState = {} } = location || {}

    if (pageKey !== state.pageKey) {
      const oldPath = state.pageKey.replace(/\/$/, '')
      const newPath = pageKey.replace(/\/$/, '')

      const transition =
        locationState.transition ||
        (isPrefix(oldPath, newPath)
          ? left
          : isPrefix(newPath, oldPath)
            ? right
            : fade)

      return { pageKey, transition }
    }

    return {}
  }

  render() {
    const { pageKey, children, ...props } = this.props
    const { transition } = this.state

    return (
      <PageTransition pageKey={pageKey} {...transition} {...props}>
        {children}
      </PageTransition>
    )
  }
}
