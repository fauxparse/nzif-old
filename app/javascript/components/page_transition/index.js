import PageTransition from './group'

import './index.scss'

export { default as none } from './none'
export { default as slide, left as slideLeft, right as slideRight } from './slide'
export { default as popOver } from './pop_over'
export { default as fade } from './fade'
export { default as push } from './push'

export { default as RootPageTransition } from './root'
export { default as SubPageTransition } from './sub_page'

export default PageTransition
