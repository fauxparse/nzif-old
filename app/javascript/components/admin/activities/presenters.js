import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CommonProps from '../../../lib/common_props'
import { WithPermission } from '../../../lib/permissions'
import Button from '../../../atoms/button'
import Modal from '../../modals'
import Presenter from './presenter'
import AddPresenter from './add_presenter'

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
      <div className="presenters">
        {presenters.map(presenter => (
          <Presenter
            key={presenter.id}
            activity={activity}
            {...presenter}
            onRemove={id => onChange(presenters.filter(p => p.id !== id))}
          />
        ))}
        <WithPermission to="update" subject={activity}>
          <Button
            className="presenters__add"
            icon="add"
            text="Add presenter"
            onClick={this.openDialog}
          />
          <Modal isOpen={adding} className="modal--autocomplete" onRequestClose={this.closeDialog}>
            <AddPresenter presenters={presenters} onSelect={this.addPresenter} />
          </Modal>
        </WithPermission>
      </div>
    )
  }
}

export default Presenters
