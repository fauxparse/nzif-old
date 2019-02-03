import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import pick from 'lodash/pick'
import deburr from 'lodash/deburr'
import Highlighter from 'react-highlight-words'
import CommonProps from '../../../lib/proptypes'
import { USERS_QUERY } from '../../../queries'
import Autocomplete from '../../autocomplete'
import Avatar from '../../shared/avatar'

const MenuItem = ({ label, selected, selectedText, value: { name }, ...props }) => (
  <li className="add-presenter__presenter" aria-selected={selected || undefined} {...props}>
    <Avatar name={name} />
    <Highlighter
      className="highlight"
      textToHighlight={label}
      searchWords={selectedText.split(/\s+/)}
      sanitize={deburr}
    />
  </li>
)

class AddPresenter extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      users: PropTypes.arrayOf(CommonProps.user.isRequired),
    }),
    presenters: PropTypes.arrayOf(CommonProps.user.isRequired),
    onSelect: PropTypes.func.isRequired,
  }

  add = ({ value }) => {
    this.props.onSelect(value)
  }

  search = (text, options) => {
    if (text) {
      const re = new RegExp(deburr(text).trim().split(/\s+/).map(w => `(?=.*${w})`).join(''), 'i')
      const ids = this.props.presenters.map(({ id }) => id)
      return options.filter(({ value: { name, id } }) => (
        deburr(name).match(re) &&
        ids.indexOf(id) === -1
      ))
    } else {
      return []
    }
  }

  render() {
    const { data: { users } } = this.props

    if (users) {
      return (
        <div className="add-presenter">
          <Autocomplete
            options={users.map(u => ({ id: u.id, label: u.name, value: pick(u, ['id', 'name']) }))}
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
