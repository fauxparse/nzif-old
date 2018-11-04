import styled from 'styled-components'
import layout from '../themes/layout'

const padding = parseInt(layout.padding, 10)
const width = parseInt(layout.width, 10)
const units = layout.width.replace(/^[\d.]+/, '')
const calc = `calc(50vw - ${`${width / 2}${units}`})`;

export default styled.section`
  padding: ${layout.padding};

  @media (min-width: ${`${width + padding * 2}${units}`}) {
    padding-left: ${calc};
    padding-right: ${calc};
  }
`
