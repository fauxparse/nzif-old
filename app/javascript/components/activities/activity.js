import React from 'react'
import CommonProps from '../../lib/common_props'
import TextLink from '../../components/shared/text_link'

class Activity extends React.PureComponent {
  render() {
    const { name, url } = this.props.activity
    return (
      <article className="card card--activity">
        <TextLink to={url} className="card__title">{name}</TextLink>
      </article>
    )
  }
}

Activity.propTypes = {
  activity: CommonProps.activity.isRequired,
}

export default Activity
