import React, { Children, Component, cloneElement, createRef } from 'react'
import styled, { css } from 'styled-components'
import throttle from 'lodash/throttle'
import { transition } from '../../../styles'

export const StyledTabBar = styled.nav`${({ theme }) => css`
  display: flex;
  border-bottom: 1px solid ${theme.colors.border};
  position: relative;
`}`

const Highlight = styled.hr`${({ theme }) => css`
  position: absolute;
  left: 0;
  bottom: -1px;
  right: 0;
  height: 0.25rem;
  background: ${theme.colors.accent};
  border: 0;
  margin: 0;
  transform-origin: 0 0;

  &[data-animate] {
    transition: ${transition('transform')};
  }
`}`

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
        .findIndex(tab => tab.classList.contains('active'))
    this.setState({ selectedIndex })
  }

  updateHighlight = throttle((animate = false) => {
    const container = this.container.current
    const { selectedIndex } = this.state
    const currentTab = container.children[selectedIndex]
    const barWidth = container.offsetWidth
    const tabWidth = currentTab.offsetWidth
    const tabLeft = currentTab.offsetLeft

    this.setState({
      animate: animate && !animate.preventDefault,
      highlightStyle: {
        transform: `translateX(${tabLeft}px) scaleX(${tabWidth / barWidth})`,
      },
    })
  }, 100, { leading: true, trailing: true })

  render() {
    const { children, ...props } = this.props
    const { highlightStyle, animate } = this.state

    return (
      <StyledTabBar ref={this.container} role="tabs" {...props}>
        {Children.map(children, child => cloneElement(child, { onActivate: this.tabChanged }))}
        <Highlight
          ref={this.highlight}
          style={highlightStyle}
          data-animate={animate || undefined}
        />
      </StyledTabBar>
    )
  }
}

export default TabBar
