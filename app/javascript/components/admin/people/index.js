import React from 'react'
import { withRouter } from 'react-router-dom'
import { Query } from 'react-apollo'
import classNames from 'classnames'
import { USERS_QUERY } from '../../../queries'
import Loader from 'atoms/loader'
import Search from './search'

const People = ({ className, match, history }) => (
  <section className={classNames('people', className)}>
    <Query query={USERS_QUERY}>
      {({ loading, data: { users = [] } = {} }) =>
        loading ? (
          <Loader />
        ) : (
          <Search users={users} onSelect={({ id }) => history.push(`${match.url}/${id}`)} />
        )
      }
    </Query>
  </section>
)

export default withRouter(People)
