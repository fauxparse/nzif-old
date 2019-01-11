import React from 'react'
import styled from 'styled-components'
import CommonProps from '../../lib/proptypes'
import TextLink from '../../components/shared/text_link'
import { text } from '../../styles'

const ActivityTitle = styled(TextLink)`
  ${text.branded}

  font-size: ${props => props.theme.fonts.size(1)};
`

const ActivityContainer = styled.article``

class Activity extends React.PureComponent {
  render() {
    const { name, url } = this.props.activity
    return (
      <ActivityContainer>
        <ActivityTitle to={url}>{name}</ActivityTitle>
      </ActivityContainer>
    )
  }
}

Activity.propTypes = {
  activity: CommonProps.activity.isRequired,
}

export default Activity
