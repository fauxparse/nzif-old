import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import styled, { css } from 'styled-components'
import pick from 'lodash/pick'
import deburr from 'lodash/deburr'
import Highlighter from 'react-highlight-words'
import CommonProps from '../../../lib/proptypes'
import { USERS_QUERY } from '../../../queries'
import Autocomplete from '../../autocomplete'
import Avatar from '../../shared/avatar'

const AddPresenterDialog = styled.div`
  ul {
    margin: 0.5em 0;
  }
`

const StyledAvatar = styled(Avatar)`
  margin-right: 1rem;
`

const StyledHighlight = styled(Highlighter)`${({ theme }) => css`
  font-size: ${theme.fonts.size(1)};
  line-height: ${theme.fonts.lineHeight}rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${theme.colors.text.shade(100)};

  mark {
    background: none;
    color: white;
    font-weight: bold;
  }
`}`

const StyledMenuItem = styled.li`${({ theme }) => css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0.5rem 1rem;
  color: ${theme.colors.text.shade(100)};

  &[aria-selected] {
    background: ${theme.colors.highlight};
    color: ${theme.colors.highlight.shade(100)};
  }
`}`

const MenuItem = ({ label, selected, selectedText, value: { name }, ...props }) => (
  <StyledMenuItem aria-selected={selected || undefined} {...props}>
    <StyledAvatar name={name} />
    <StyledHighlight
      textToHighlight={label}
      searchWords={selectedText.split(/\s+/)}
      sanitize={deburr}
    />
  </StyledMenuItem>
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
        <AddPresenterDialog>
          <Autocomplete
            options={users.map(u => ({ id: u.id, label: u.name, value: pick(u, ['id', 'name']) }))}
            menuItemComponent={MenuItem}
            search={this.search}
            placeholder="Type someone’s name…"
            onChange={this.add}
          />
        </AddPresenterDialog>
      )
    } else {
      return <Fragment />
    }
  }
}

export default graphql(USERS_QUERY)(AddPresenter)
