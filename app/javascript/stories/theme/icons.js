/* eslint-disable react/display-name */

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Icon from '../../components/icons'
import ICONS from '../../components/icons/all'

const StyledIcon = styled(Icon)`
  flex: none;
`

const IconContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12em, 1fr));
  padding: 1em;
`

const LabelledIcon = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5em;

  ${StyledIcon} {
    margin-right: 1em;
  }
`

const IconLabel = styled.div`
  flex: 1;
`

const IconWithLabel = ({ name }) => (
  <LabelledIcon>
    <StyledIcon name={name} />
    <IconLabel>{name}</IconLabel>
  </LabelledIcon>
)

IconWithLabel.propTypes = {
  name: PropTypes.string.isRequired,
}

class IconList extends React.Component {
  render() {
    return (
      <IconContainer>
        {ICONS.sort().map(icon => <IconWithLabel key={icon} name={icon} />)}
      </IconContainer>
    )
  }
}

export default () => <IconList />
