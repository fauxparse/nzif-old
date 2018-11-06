import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import Background from '../../components/shared/background'
import FullWidth from '../../styles/full_width'
import BrandedText from '../../styles/branded_text'
import Date from '../../styles/date'

export const HOMEPAGE_FRAGMENT = gql`
  fragment HomepageFragment on Festival {
    year
    startDate
    endDate
  }
`

export const HOMEPAGE_QUERY = gql`
  query Festival($year: Int!) {
    festival(year: $year) {
      ...HomepageFragment
    }
  }
  ${HOMEPAGE_FRAGMENT}
`

const HeroSection = styled(FullWidth)`
  color: white;

  h1 {
    font-size: ${props => props.theme.fonts.scale(10)};
    text-shadow: 0 0 0.25em rgba(0, 0, 0, 0.15);
    margin: 0;
  }

  h2 {
    margin: 0;
    font-size: ${props => props.theme.fonts.scale(3)};
    font-weight: ${props => props.theme.fonts.weights.normal};
  }
`

const Home = ({ match }) => {
  const year = parseInt(match.params.year, 10)

  return (
    <Query query={HOMEPAGE_QUERY} variables={{ year }}>
      {({ loading, data: { festival } }) => !loading && (
        <Fragment>
          <HeroSection as={Background}>
            <BrandedText as="h1">NZIF {festival.year}</BrandedText>
            <h2><Date date={[festival.startDate, festival.endDate]} /></h2>
          </HeroSection>
        </Fragment>
      )}
    </Query>
  )
}

Home.propTypes = {
  match: PropTypes.object.isRequired,
}

export default Home
