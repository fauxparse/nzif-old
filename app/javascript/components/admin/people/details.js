import React, { Component } from 'react'
import { Query, withApollo, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'
import { EDIT_USER_QUERY, UPDATE_USER_MUTATION } from '../../../queries'
import PropTypes from 'lib/proptypes'
import Loader from 'atoms/loader'
import Breadcrumbs from '../../shared/breadcrumbs'
import NotFound from 'templates/not_found'
import Editor from '../../profile/editor'

class PersonDetails extends Component {
  static propTypes = {
    className: PropTypes.className,
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
    const { className, match: { params } } = this.props
    const { year, id } = params
    const { saving, errors } = this.state

    return (
      <section className={classNames('edit-user', className)}>
        <Breadcrumbs back={`/admin/${year}/people`}>
          <Breadcrumbs.Link to={`/admin/${year}/people`}>
            People
          </Breadcrumbs.Link>
        </Breadcrumbs>
        <Query query={EDIT_USER_QUERY} variables={{ id }}>
          {({ loading, data: { user } = {} }) =>
            loading ? (
              <Loader />
            ) : user ? (
              <Editor
                user={user}
                saving={saving}
                errors={errors}
                onChange={this.save(user.id)}
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

export default compose(
  withRouter,
  withApollo
)(PersonDetails)
