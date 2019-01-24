import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import styled, { css } from 'styled-components'
import CommonProps from '../../../lib/proptypes'
import { USERS_QUERY } from '../../../queries'
import Autocomplete from '../../autocomplete'

const AddPresenterDialog = styled.div`
  ul {
    margin: 0.5em 0;
  }
`

class AddPresenter extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      users: PropTypes.arrayOf(CommonProps.user.isRequired),
    }),
    onSelect: PropTypes.func.isRequired,
  }

  add = ({ value }) => {
    this.props.onSelect(value)
  }

  render() {
    const { data: { users } } = this.props

    if (users) {
      return (
        <AddPresenterDialog>
          <Autocomplete
            options={users.map(u => ({ id: u.id, label: u.name, value: u }))}
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
