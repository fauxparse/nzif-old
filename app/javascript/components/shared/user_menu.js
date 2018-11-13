import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import chroma from 'chroma-js'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Avatar from './avatar'
import Icon from '../icons'

const CurrentUserName = styled.span``

const CurrentUser = styled(Link)`
  align-items: center;
  align-self: stretch;
  background: ${({ theme }) => chroma(theme.colors.text).alpha(0).css()};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  padding: 0 0.5em;
  text-decoration: none;
  transition: ${props => props.theme.transition()};

  &:hover,
  &:focus {
    background: ${props => chroma(props.theme.colors.text).alpha(0.15).css()};
    outline: none;
  }

  ${CurrentUserName},
  > ${Icon} {
    display: none;
  }

  @media (min-width: ${props => props.theme.layout.medium}) {
    > ${Icon} {
      display: initial;
    }

    ${CurrentUserName} {
      display: initial;
      padding: 0 0.5em;
    }
  }
`

export const CURRENT_USER_QUERY = gql`
  {
    currentUser {
      id
      name
      email
    }
  }
`

const UserMenu = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data: { currentUser } = {}, loading, error }) => (
      <CurrentUser {...props} to={currentUser ? '/profile' : '/login'}>
        {loading ? (
          ''
        ) : currentUser ? (
          <Fragment>
            <Avatar name={currentUser.name} />
            <CurrentUserName>{currentUser.name}</CurrentUserName>
            <Icon name="chevron-down" />
          </Fragment>
        ) : (
          'Log in'
        )}
      </CurrentUser>
    )}
  </Query>
)

export default styled(UserMenu)``
