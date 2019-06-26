import React, { Component, Fragment } from 'react'
import PropTypes from 'lib/proptypes'
import { graphql } from 'react-apollo'
import pick from 'lodash/pick'
import deburr from 'lodash/deburr'
import Highlighter from 'react-highlight-words'
import { USERS_QUERY } from '../../../queries'
import Autocomplete from '../../autocomplete'
import Avatar from '../../shared/avatar'

const MenuItem = ({ label, selected, selectedText, value, ...props }) => (
  <li className="add-presenter__presenter" aria-selected={selected || undefined} {...props}>
    <Avatar {...value} />
    <Highlighter
      className="highlight"
      textToHighlight={label}
      searchWords={selectedText.split(/\s+/)}
      sanitize={deburr}
    />
  </li>
)

MenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  selectedText: PropTypes.string,
  value: PropTypes.shape({
    name: PropTypes.string.isRequired,
  })
}

class AddPresenter extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      users: PropTypes.arrayOf(PropTypes.user.isRequired)
    }),
    presenters: PropTypes.arrayOf(PropTypes.user.isRequired),
    onSelect: PropTypes.func.isRequired
  }

  add = ({ value }) => {
    this.props.onSelect(value)
  }

  search = (text, options) => {
    if (text) {
      const re = new RegExp(
        deburr(text)
          .trim()
          .split(/\s+/)
          .map(w => `(?=.*${w})`)
          .join(''),
        'i'
      )
      const ids = this.props.presenters.map(({ id }) => id)
      return options.filter(
        ({ value: { name, id } }) =>
          deburr(name).match(re) && ids.indexOf(id) === -1
      )
    } else {
      return []
    }
  }

  render() {
    const {
      data: { users }
    } = this.props

    if (users) {
      return (
        <div className="add-presenter">
          <Autocomplete
            options={users.map(u => ({
              id: u.id,
              label: u.name,
              value: pick(u, ['id', 'name', 'image'])
            }))}
            menuItemComponent={MenuItem}
            search={this.search}
            placeholder="Type someone’s name…"
            onChange={this.add}
          />
        </div>
      )
    } else {
      return <Fragment />
    }
  }
}

export default graphql(USERS_QUERY)(AddPresenter)
