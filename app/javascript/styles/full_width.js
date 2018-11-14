import styled from 'styled-components'
import layout from '../themes/layout'

const padding = parseInt(layout.padding, 10)
const width = parseInt(layout.width, 10)
const units = layout.width.replace(/^[\d.]+/, '')

export const minFullWidth = `${width + padding * 2}${units}`
export const sidePadding = `calc(50vw - ${`${width / 2}${units}`})`;

export default styled.section`
  padding: ${layout.padding};

  @media (min-width: ${minFullWidth}) {
    padding-left: ${sidePadding};
    padding-right: ${sidePadding};
  }
`
