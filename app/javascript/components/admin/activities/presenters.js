import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import CommonProps from '../../../lib/proptypes'
import { WithPermission } from '../../../lib/permissions'
import Button from '../../button'
import { Modal } from '../../modals'
import Presenter from './presenter'
import AddPresenter from './add_presenter'

const AddButton = styled(Button).attrs({ icon: 'add', text: 'Add presenter' })`${({ theme }) => css`
  color: ${theme.colors.secondary};
  border-style: dashed;
  border-radius: 1.25rem;
  margin: 0.25rem;
  border-color: ${theme.colors.disabled};
`}`

const PresentersContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: -0.25rem;
`

class Presenters extends Component {
  static propTypes = {
    activity: CommonProps.activity.isRequired,
    presenters: PropTypes.arrayOf(CommonProps.user.isRequired).isRequired,
    onChange: PropTypes.func.isRequired,
  }

  state ={
    adding: false,
  }

  addPresenter = (presenter) => {
    const { presenters, onChange } = this.props
    this.closeDialog()
    onChange([...presenters, presenter])
  }

  openDialog = () => this.setState({ adding: true })

  closeDialog = () => this.setState({ adding: false })

  render() {
    const { activity, presenters, onChange } = this.props
    const { adding } = this.state

    return (
      <PresentersContainer>
        {presenters.map(presenter => (
          <Presenter
            key={presenter.id}
            activity={activity}
            {...presenter}
            onRemove={id => onChange(presenters.filter(p => p.id !== id))}
          />
        ))}
        <WithPermission to="update" subject={activity}>
          <AddButton onClick={this.openDialog} />
          <Modal isOpen={adding} className="modal--autocomplete" onRequestClose={this.closeDialog}>
            <AddPresenter presenters={presenters} onSelect={this.addPresenter} />
          </Modal>
        </WithPermission>
      </PresentersContainer>
    )
  }
}

export default Presenters
