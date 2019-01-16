import React from 'react'
import PropTypes from 'prop-types'
import ReactRouterPropTypes from 'react-router-prop-types'
import styled, { css } from 'styled-components'
import Icon from '../icons'
import { Link } from './ripple'
import TextLink from './text_link'

const StyledBreadcrumbs = styled.div`${({ theme }) => css`
  display: flex;
  align-items: center;
  font-size: ${theme.fonts.size(-1)};

  ${TextLink} {
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: ${theme.colors.secondary};
  }
`}`

const BackLink = styled(Link).attrs({ children: <Icon name="back" /> })`${({ theme }) => css`
  flex: 0 0 2.5rem;
  padding: 0.5rem;
  margin: 0 0.5rem 0 -3rem;
  color: ${theme.colors.secondary};
  font-size: ${theme.fonts.size(0)};
`}`

const Breadcrumbs = ({ back, children, ...props }) => (
  <StyledBreadcrumbs {...props}>
    {back && <BackLink to={back} />}
    {children}
  </StyledBreadcrumbs>
)

Breadcrumbs.propTypes = {
  back: PropTypes.oneOfType([
    ReactRouterPropTypes.location,
    PropTypes.string,
  ]),
}

Breadcrumbs.defaultProps = {
  back: null,
}

export default Breadcrumbs
