export const EASING = {
  standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
  accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',
}

export default (property = 'all', duration = '300ms', easing = EASING.standard, delay = '0s') =>
  `${property} ${duration} ${easing} ${delay}`
