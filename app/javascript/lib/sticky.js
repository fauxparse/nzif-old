import Stickyfill from 'stickyfilljs'

Stickyfill.forceSticky()

// wait for reflow before triggering resize
window.removeEventListener('resize', Stickyfill.refreshAll)
window.addEventListener('resize', () => setTimeout(Stickyfill.refreshAll))

export default Stickyfill
