import partition from 'lodash/partition'

export default (list, ...predicates) => predicates.reduce((groups, predicate) => {
  const current = groups.pop()
  return groups.concat(partition(current, predicate))
}, [list])
