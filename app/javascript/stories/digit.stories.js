/* global module */

import React from 'react'
import PropTypes from 'prop-types'
import { storiesOf } from '@storybook/react'
import { number } from '@storybook/addon-knobs'
import Digit from './../components/shared/digit'

const Counter = ({ count }) => (
  <div className="digits">
    <Digit number={Math.floor(count / 1000)} />
    <Digit number={Math.floor((count % 1000) / 100)} />
    <Digit number={Math.floor((count % 100) / 10)} />
    <Digit number={Math.floor(count % 10)} />
  </div>
)

Counter.propTypes = {
  count: PropTypes.number.isRequired,
}

storiesOf('Components/Digit', module)
  .add('Digit', () => <Counter count={number('Number', 0)} />)
