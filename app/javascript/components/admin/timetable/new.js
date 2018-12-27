import React from 'react'
import PropTypes from 'prop-types'
import MomentPropTypes from 'react-moment-proptypes'
import styled, { css } from 'styled-components'
import Icon from '../../icons'
import Autocomplete, { Highlight } from '../../autocomplete'

const StyledIcon = styled(Icon)`${({ theme }) => css`
  flex: 0 0 auto;
  margin: 0.1rem 1rem 0.1rem 0;
  color: ${theme.colors.secondary};
`}`

const StyledHighlight = styled(Highlight)`${({ theme }) => css`
  flex: 1;
  font-size: ${theme.fonts.scale(1)};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`}`

const StyledMenuItem = styled.li`${({ theme }) => css`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0.5rem 1rem;

  &[aria-selected] {
    background: ${theme.colors.accent};
    color: ${theme.colors.white};
  }
`}`

const MenuItem = ({ label, selected, selectedText, value: { type } }) => (
  <StyledMenuItem aria-selected={selected || undefined}>
    <StyledIcon name={type} />
    <StyledHighlight text={label} prefix={selectedText} />
  </StyledMenuItem>
)

MenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  selectedText: PropTypes.string.isRequired,
  value: PropTypes.shape({ type: PropTypes.string.isRequired }).isRequired,
}

const StyledNewSession = styled.section``

class NewSession extends React.Component {
  static propTypes = {
    activities: PropTypes.array.isRequired,
    startsAt: MomentPropTypes.momentObj,
    endsAt: MomentPropTypes.momentObj,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  }

  state = {
    activityName: '',
  }

  render() {
    const { activities } = this.props
    const { activityName } = this.state

    return (
      <StyledNewSession>
        <Autocomplete
          value={activityName}
          options={activities.map(a => ({ id: a.id, label: a.name, value: a }))}
          placeholder="Type activity name…"
          menuItemComponent={MenuItem}
        />
      </StyledNewSession>
    )
  }
}

export default NewSession
