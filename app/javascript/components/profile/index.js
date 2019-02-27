import React, { Component } from 'react'
import { Query, withApollo } from 'react-apollo'
import classNames from 'classnames'
import { EDIT_USER_QUERY, UPDATE_USER_MUTATION } from '../../queries'
import CommonProps from '../../lib/common_props'
import Loader from '../shared/loader'
import NotFound from '../not_found'
import Editor from './editor'

class ProfileSection extends Component {
  static propTypes = {
    className: CommonProps.className,
  }

  state = {
    saving: false,
  }

  save = (id) => (attributes) => {
    const variables = { id, attributes }

    this.setState({ saving: true })

    this.props.client.mutate({
      mutation: UPDATE_USER_MUTATION,
      variables,
      errorPolicy: 'all',
    })
    .then(this.saved)
  }

  saved = ({ errors }) => {
    if (errors) {
      this.setState({ saving: false, errors: errors[0].detail })
    } else {
      this.setState({ saving: false, errors: null })
    }
  }

  render() {
    const { className } = this.props
    const { saving, errors } = this.state

    return (
      <section className={classNames('my-profile', className)}>
        <Query query={EDIT_USER_QUERY}>
          {({ loading, data: { currentUser } = {} }) =>
            loading ? (
              <Loader />
            ) : currentUser ? (
              <Editor
                user={currentUser}
                saving={saving}
                errors={errors}
                onChange={this.save(currentUser.id)}
              />
            ) : (
              <NotFound />
            )
          }
        </Query>
      </section>
    )
  }
}

export default withApollo(ProfileSection)
