import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Icon, { ICONS } from '../icons'

const Contents = styled.div`
  flex: 1 1 100%;
  max-width: 100%;
`

const FieldIcon = styled(Icon)`
  flex: 0 0 auto;
  margin: 0.5rem 1rem 0.5rem -2.5rem;
`

const Container = styled.label`
  display: flex;
  align-items: flex-start;
  margin: 0 0 1.5rem;
`

const IconField = ({ label, icon, children, ...props }) => (
  <Container aria-label={label} {...props}>
    <FieldIcon name={icon} />
    <Contents>
      {children}
    </Contents>
  </Container>
)

IconField.propTypes = {
  icon: PropTypes.oneOf(ICONS).isRequired,
  label: PropTypes.string.isRequired,
}

export default IconField
