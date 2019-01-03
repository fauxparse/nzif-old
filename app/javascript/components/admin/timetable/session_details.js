import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import CommonProps from '../../../lib/proptypes'
import Icon from '../../icons'
import Button from '../../button'
import Date from '../../shared/date'
import Time from '../../shared/time'

const ActivityIcon = styled(Icon)``

const ActionButton = styled(Button)`
  color: inherit;
  border-color: transparent;
`

const Actions = styled(({ session, onDelete, onDuplicate, onClose, ...props }) => (
  <div {...props}>
    <ActionButton icon="trash" onClick={onDelete} />
    <ActionButton icon="copy" onClick={onDuplicate} />
    <ActionButton icon="close" onClick={onClose} />
  </div>
))`${({ theme }) => css`
  color: ${theme.colors.secondary};
  margin: -0.75rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  ${ActionButton} {
    margin-left: 0.5rem;
  }
`}`

const Title = styled(({ session: { activity, startsAt, endsAt }, ...props }) => (
  <div {...props}>
    <ActivityIcon name={activity.type} />
    <h3>{activity.name}</h3>
    <p>
      <Time time={[startsAt, endsAt]} />
      {', '}
      <Date date={startsAt} />
    </p>
  </div>
))`${({ theme }) => css`
  display: grid;
  align-items: flex-start;
  grid-template-columns: 3.5em auto;
  margin: 0.5rem 0;

  ${ActivityIcon} {
    margin: calc((${theme.fonts.scale(3)} / 1.5 * ${theme.fonts.lineHeight} - 1em) / 2) 0.5rem;
  }

  h3 {
    color: ${theme.colors.text};
    font-size: ${theme.fonts.scale(3)};
    font-weight: normal;
    margin: 0;
  }

  p {
    grid-column: 2 / 3;
    color: ${theme.colors.secondary};
    margin: 0;
  }
`}`

class SessionDetails extends Component {
  static propTypes = {
    session: CommonProps.session,
    onDelete: PropTypes.func.isRequired,
    onDuplicate: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  static defaultProps = {
    session: undefined,
  }

  static getDerivedStateFromProps = ({ session }) => (session ? { session } : {})

  state = {}

  delete = () => {
    const { onDelete, onClose } = this.props
    onDelete(this.state.session)
    onClose()
  }

  duplicate = () => {
    const { onDuplicate, onClose } = this.props
    onDuplicate(this.state.session)
    onClose()
  }

  render() {
    const {
      session: _session,
      onDelete,
      onDuplicate,
      onClose,
      ...props
    } = this.props
    const { session } = this.state

    return (
      <div {...props}>
        <Actions
          onDelete={this.delete}
          onDuplicate={this.duplicate}
          onClose={onClose}
        />
        <Title {...{ session }} />
      </div>
    )
  }
}

export default styled(SessionDetails)`${({ theme }) => css`
  padding: ${theme.layout.padding};
`}`
