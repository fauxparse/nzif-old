import { css } from 'styled-components'
import isObject from 'lodash/isObject'

export const EASING = {
  standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
  accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',
  bounce: 'cubic-bezier(0.5, 0, 0.5, 1.5)',
}

export const DURATION = {
  standard: 300,
  half: 150,
  fast: 150,
}

export const DEFAULTS = {
  easing: EASING.standard,
  duration: DURATION.standard,
  delay: 0,
}

const normalizeTime = time =>
  `${DURATION[time] || (time < 1 ? time * 1000 : time)}ms`

const transition = (...args) => {
  const properties = args
  const options = {
    ...DEFAULTS,
    ...(isObject(properties[properties.length - 1]) ? properties.pop() : {}),
  }
  const duration = normalizeTime(options.duration)
  const delay = normalizeTime(options.delay)
  const easing = EASING[options.easing] || options.easing
  const transitions = properties.map(property => `${property} ${duration} ${easing} ${delay}`)

  return css`${transitions.join(', ')}`
}

export default transition
