import React, { Component, createRef } from 'react'
import throttle from 'lodash/throttle'
import classNames from 'classnames'
import DetectLocationChange from 'lib/detect_location_change'

export class TabBar extends Component {
  state = {
    highlightStyle: {}
  }

  container = createRef()
  highlight = createRef()

  componentDidMount() {
    this.tabChanged()
    window.addEventListener('resize', this.updateHighlight)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateHighlight)
  }

  componentDidUpdate(_, { selectedIndex: old }) {
    const { selectedIndex } = this.state

    if (selectedIndex !== old) {
      this.updateHighlight(old !== undefined)
    }
  }

  tabChanged = () => {
    const selectedIndex =
      Array.from(this.container.current.querySelectorAll('[role="tab"]'))
        .findIndex(tab => tab.classList.contains('tabs__tab--active'))
    this.setState({ selectedIndex })
  }

  updateHighlight = throttle((animate = false) => {
    const container = this.container.current
    const { selectedIndex } = this.state
    const currentTab = container.children[selectedIndex]
    const barWidth = container.offsetWidth
    const tabWidth = currentTab ? currentTab.offsetWidth : 0
    const tabLeft = currentTab ? currentTab.offsetLeft : 0
    const opacity = currentTab ? 1 : 0

    this.setState({
      animate: animate && !animate.preventDefault,
      highlightStyle: {
        transform: `translateX(${tabLeft}px) scaleX(${tabWidth / barWidth})`,
        opacity,
      },
    })
  }, 100, { leading: true, trailing: true })

  render() {
    const { className, children, ...props } = this.props
    const { highlightStyle, animate } = this.state

    return (
      <nav className={classNames('tabs', className)} ref={this.container} role="tabs" {...props}>
        {children}
        <hr className="tabs--highlight"
          ref={this.highlight}
          style={highlightStyle}
          data-animate={animate || undefined}
        />
        <DetectLocationChange onChange={this.tabChanged} />
      </nav>
    )
  }
}

export default TabBar
