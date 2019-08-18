import capitalize from 'lodash/capitalize'
import snakeCase from 'lodash/snakeCase'

export default str => capitalize(snakeCase(str).replace(/[_-]/g, ' '))
