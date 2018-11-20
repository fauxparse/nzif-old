import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import TextLink from '../../components/shared/text_link'
import { text } from '../../styles'

const ActivityTitle = styled(TextLink)`
  ${text.branded}

  font-size: ${props => props.theme.fonts.scale(1)};
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
  activity: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
}

export default Activity
