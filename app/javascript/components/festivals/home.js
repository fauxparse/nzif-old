import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import PageContent from '../../components/page_content'
import Background from '../../components/shared/background'
import { fullWidth } from '../../styles'
import { brandedText } from '../../styles'
import Date from '../../components/shared/date'

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

const HeroSection = styled.section`
  ${fullWidth}

  color: white;

  h1 {
    ${brandedText}

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
    <PageContent>
      <Query query={HOMEPAGE_QUERY} variables={{ year }}>
        {({ loading, data: { festival } }) => !loading && (
          <Fragment>
            <Background as={HeroSection}>
              <h1>NZIF {festival.year}</h1>
              <h2><Date date={[festival.startDate, festival.endDate]} /></h2>
            </Background>
          </Fragment>
        )}
      </Query>
    </PageContent>
  )
}

Home.propTypes = {
  match: PropTypes.object.isRequired,
}

export default Home
