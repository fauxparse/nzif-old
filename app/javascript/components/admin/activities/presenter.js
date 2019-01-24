import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import CommonProps from '../../../lib/proptypes'
import { WithPermission } from '../../../lib/permissions'
import transition from '../../../styles/transition'
import Avatar from '../../shared/avatar'
import Button from '../../button'

const PresenterAvatar = styled(Avatar)``

const PresenterName = styled.span`
  padding: 0 0 0 0.5em;

  &:last-child {
    margin-right: 1rem;
  }
`

const RemoveButton = styled(Button).attrs({ icon: 'close' })`${({ theme }) => css`
  border: 0;
  margin: 0 0.25rem;

  &:focus {
    box-shadow: inset 0 0 0 0.25em ${theme.colors.outline};
  }

  ${Button.Icon} {
    color: ${theme.colors.grey(100)};
    font-size: 1rem;
    stroke-width: 3px;
  }
`}`

const StyledPresenter = styled.div`${({ theme }) => css`
  display: flex;
  align-items: center;
  border-radius: 1.25rem;
  background: ${theme.colors.grey(700)};
  box-shadow: 0 0 0 0 ${theme.colors.outline.alpha(0)};
  transition: ${transition('box-shadow')};

  &:not(:last-child) {
    margin-right: 1rem;
  }

  &:focus-within {
    box-shadow: 0 0 0 0.25em ${theme.colors.outline};

    ${RemoveButton} {
      box-shadow: none;
    }
  }
`}`

const Presenter = ({ id, name, activity, onRemove }) => {
  return (
    <StyledPresenter>
      <PresenterAvatar name={name} />
      <PresenterName>{name}</PresenterName>
      <WithPermission to="update" subject={activity}>
        <RemoveButton onClick={() => onRemove(id)} />
      </WithPermission>
    </StyledPresenter>
  )
}

Presenter.propTypes = {
  id: CommonProps.id.isRequired,
  name: PropTypes.string.isRequired,
  activity: CommonProps.activity.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default Presenter
