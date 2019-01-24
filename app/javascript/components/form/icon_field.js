import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Transition } from 'react-transition-group'
import Icon, { ICONS } from '../icons'
import Loader from '../shared/loader'
import Tooltip from '../shared/tooltip'
import transition, { DURATION } from '../../styles/transition'

const Contents = styled.div`
  flex: 1 1 100%;
  max-width: 100%;
`

const FieldLoader = styled(Loader)`
  left: -1.75rem;
  top: 1.25rem;
  margin: -1.5rem;
  width: 3rem;
  height: 3rem;
  transition: ${transition('opacity')};

  svg {
    width: 3rem;
    height: 3rem;

    circle {
      stroke-width: 4;
    }
  }
`

const FieldIcon = styled(Icon)`
`

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 0 0 1.5rem;
  position: relative;

  [data-tooltipped] {
    flex: 0 0 auto;
    margin: 0rem 0.5rem 0rem -3rem;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0.5rem;
  }
`

const transitionStyles = {
  entering: { opacity: 0 },
  entered:  { opacity: 1 },
  exiting:  { opacity: 1 },
  exited:   { opacity: 0 },
}

const IconField = ({ label, loading, icon, children, ...props }) => (
  <Container aria-label={label} {...props}>
    <Tooltip title={label} style={{ display: 'block' }} animateFill={false} arrow={true}>
      <FieldIcon name={icon} />
      <Transition in={loading} timeout={DURATION.standard} appear>
        {state => (
          <FieldLoader style={transitionStyles[state]} />
        )}
      </Transition>
    </Tooltip>
    <Contents>
      {children}
    </Contents>
  </Container>
)

IconField.propTypes = {
  icon: PropTypes.oneOf(ICONS).isRequired,
  label: PropTypes.string.isRequired,
  loading: PropTypes.bool,
}

IconField.defaultProps = {
  loading: false,
}

export default IconField
