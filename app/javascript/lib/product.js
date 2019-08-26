export default (array1, array2) => (
  array1.reduce((result, el) => [...result, ...array2.map(el2 => [el, el2])], [])
)
