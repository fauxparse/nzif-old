import React, { useCallback, useEffect, useState } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Button from 'atoms/button'
import Popover from '../../organisms/popover'

const Covid = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seen = JSON.parse(localStorage.getItem('seenCovidStatement') || 'false');
    setVisible(!seen);
  }, []);

  const close = useCallback(() => {
    localStorage.setItem('seenCovidStatement', 'true');
    setVisible(false);
  }, []);

  return (
    <TransitionGroup component={null}>
      {visible && (
        <CSSTransition key="modal" timeout={1000} classNames="popover">
          <Popover className="covid-statement" onClose={close}>
            <h1>Welcome to NZIF 2021!</h1>
            <p style={{ fontWeight: 'bold' }}>
              We’re very excited to have booked some wonderful Australian
              teachers and directors to present at NZIF 2021 along with our kiwi
              presenters. However, we’ve done it in the knowledge that
              international travel is an uncertain privilege, and we are keeping
              a close eye on changes in the trans-Tasman travel bubble.
            </p>
            <p>
              In mid-September we will make a call as to whether we expect our
              Australian whānau to be able to attend the festival. If they are,
              hooray! Everything will go ahead as planned. If their presence
              looks unlikely, we have back-up plans in place for each show and
              workshop, where local directors and teachers will present instead.
            </p>
            <p>
              If we make the call to switch to Plan B before earlybird
              registrations close, you will be notified and can update your
              workshop preferences, should you not want to attend the substitute
              workshop.
            </p>
            <p>
              If we find a teacher will be unable to make it after earlybird
              registrations have closed, we will automagically enrol their
              participants in the cool new substitute workshop at the same time,
              place and cost. If you don’t want to attend your replacement
              workshop, you’ll be able to talk to us about changing to another
              workshop or getting a refund.
            </p>
            <p>
              One last feature of our Plan B: if you live outside of New
              Zealand, register for workshops, and travel restrictions mean you
              are not able to get to Wellington in time for the Festival, you
              will receive a full refund.
            </p>
            <p>
              Thank you for your understanding, and we hope to see you in
              October!
            </p>
            <p>
              Ngā mihi,
              <br />
              The Festival Team
            </p>

            <Button primary text="Register for NZIF" onClick={close} />
          </Popover>
        </CSSTransition>
      )}
    </TransitionGroup>
  );
};

export default Covid;
