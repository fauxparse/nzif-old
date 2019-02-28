import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import deburr from 'lodash/deburr'
import sortBy from 'lodash/sortBy'
import MiniSearch from 'minisearch'
import Autocomplete from '../../autocomplete'
import Person from './person'

const PeopleSearch = ({ users, onSelect }) => {
  const sorted = useMemo(() => sortBy(users, [user => deburr(user.name)]), [
    users
  ])
  const options = useMemo(
    () => sorted.map(u => ({ id: u.id, label: u.name, value: u })),
    [sorted]
  )
  const byId = useMemo(
    () => options.reduce((map, option) => ({ ...map, [option.id]: option }), {}),
    [options]
  )

  const searcher = useMemo(
    () => {
      const miniSearch = new MiniSearch({
        fields: ['name', 'email'],
        extractField: (user, field) => deburr(user[field]),
        searchOptions: {
          tokenize: string =>
            deburr(string).toLowerCase().split(/[^a-zA-Z0-9\u00C0-\u017F]+/),
          processTerm: deburr,
          prefix: true,
          fuzzy: 0.25,
        },
      })
      miniSearch.addAll(sorted)
      return miniSearch
    },
    [sorted]
  )

  const search = (value) => {
    if (value) {
      return searcher.search(value).map(({ id }) => byId[id])
    } else {
      return options
    }
  }

  return (
    <div className="people__search">
      <h1 className="page-title">People</h1>
      <Autocomplete
        menuItemComponent={Person}
        options={options}
        placeholder="Type someone’s name…"
        search={search}
        autoFocus
        showFullList
        onChange={onSelect}
      />
    </div>
  )
}

PeopleSearch.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })),
  onSelect: PropTypes.func.isRequired,
}

export default PeopleSearch
