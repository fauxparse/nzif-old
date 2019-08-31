export default (array1, array2) => (
  Array.from(array1)
    .reduce((result, el) => [
      ...result,
      ...Array.from(array2).map(el2 => [el, el2])
    ], [])
)
