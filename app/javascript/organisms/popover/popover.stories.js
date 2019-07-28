/* global module */
/* eslint-disable react/unused-prop-type */

import React, { Fragment, useCallback, useState } from 'react'
import { storiesOf } from '@storybook/react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Button from 'atoms/button'
import Popover from './'

const PopoverDemo = () => {
  const [visible, setVisible] = useState(false)
  const toggleVisible = useCallback(() => setVisible(!visible), [visible, setVisible])

  return (
    <Fragment>
      <Button primary onClick={toggleVisible} text={visible ? 'Hide' : 'Show'} />
      <TransitionGroup component={null}>
        {visible && (
          <CSSTransition key="modal" timeout={1000} classNames="popover">
            <Popover onClose={toggleVisible}>
              <h1>Hi there</h1>
              <p>
                Hey, Doc, we better back up, we don’t have enough roads to get up to 88.
                On the night I go back in time, you get- Doc. No, why, what’s a matter?
                A block passed Maple, that’s John F. Kennedy Drive. Hey, McFly, I thought I told
                you never to come in here. Well it’s gonna cost you.
                How much money you got on you?
              </p>
              <p>
                I think it’s terrible. Girls chasing boys. When I was your age I never chased a
                boy, or called a boy, or sat in a parked car with a boy. Stop it. Right. Wait a
                minute, what are you doing, Doc? Looks like a airplane, without wings.
              </p>
              <Button primary text="Okay!" onClick={toggleVisible} />
            </Popover>
          </CSSTransition>
        )}
      </TransitionGroup>
    </Fragment>
  )
}

storiesOf('Organisms|Popover', module).add('Modal', () => <PopoverDemo />)
