import React from 'react'
import { Query } from 'react-apollo'
import classNames from 'classnames'
import { USERS_QUERY } from '../../../queries'
import Loading from '../../shared/loader'
import Search from './search'

const People = ({ className }) => (
  <section className={classNames('people', className)}>
    <Query query={USERS_QUERY}>
      {({ loading, data: { users = [] } = {} }) =>
        loading ? (
          <Loading />
        ) : (
          <Search users={users} onSelect={console.log} />
        )
      }
    </Query>
  </section>
)

export default People
