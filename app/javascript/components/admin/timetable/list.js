import React from 'react'
import styled, { css } from 'styled-components'
import Context from './context'

const StyledList = styled.div`${({ theme, scale, granularity, 'data-rows': rows }) => css`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: repeat(${rows}, 1em);
  font-size: ${scale}em;
  background: linear-gradient(to top, ${theme.colors.border}, transparent 1px) repeat-y 0 0 / 100% ${granularity}em;
`}`

class List extends React.Component {
  static contextType = Context

  render() {
    const { children, selection, onResize, ...props } = this.props
    const { start, end, scale, granularity } = this.context
    const rows = (end - start) * granularity

    return (
      <StyledList
        scale={scale}
        granularity={granularity}
        data-rows={rows}
        {...props}
      >
        {children}
      </StyledList>
    )
  }
}

export default List
