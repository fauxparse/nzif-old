import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import CommonProps from '../../../lib/proptypes'
import Presenter from './presenter'

const PresentersContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: start;
`

const Presenters = ({ activity, presenters, onChange }) => (
  <PresentersContainer>
    {presenters.map(presenter => (
      <Presenter
        key={presenter.id}
        activity={activity}
        {...presenter}
        onRemove={id => onChange(presenters.filter(p => p.id !== id))}
      />
    ))}
  </PresentersContainer>
)

Presenters.propTypes = {
  activity: CommonProps.activity.isRequired,
  presenters: PropTypes.arrayOf(CommonProps.user.isRequired).isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Presenters
