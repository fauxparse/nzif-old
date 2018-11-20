import { css } from 'styled-components'
import PageTransition from './group'

import { styles as noStyles } from './none'
import { styles as slideStyles } from './slide'
import { styles as popOverStyles } from './pop_over'
import { styles as fadeStyles } from './fade'
import { styles as pushStyles } from './push'

export { default as none } from './none'
export { default as slide, left as slideLeft, right as slideRight } from './slide'
export { default as popOver } from './pop_over'
export { default as fade } from './fade'
export { default as push } from './push'

export { default as RootPageTransition } from './root'
export { default as SubPageTransition } from './sub_page'

export const transitionStyles = css`
  ${noStyles}
  ${fadeStyles}
  ${pushStyles}
  ${popOverStyles}
  ${slideStyles}
`

export default PageTransition
