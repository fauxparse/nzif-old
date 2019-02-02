import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import PageContent from '../../components/page_content'
import Background from '../../components/shared/background'
import Date from '../../components/shared/date'
import Loader from '../../components/shared/loader'

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

const Home = ({ match }) => {
  const year = parseInt(match.params.year, 10)

  return (
    <PageContent>
      <Query query={HOMEPAGE_QUERY} variables={{ year }}>
        {({ loading, data: { festival } }) =>
          loading ? (
            <Loader />
          ) : (
            <Fragment>
              <Background className="hero-section">
                <h1>NZIF {festival.year}</h1>
                <h2>
                  <Date date={[festival.startDate, festival.endDate]} />
                </h2>
              </Background>
            </Fragment>
          )
        }
      </Query>
    </PageContent>
  )
}

Home.propTypes = {
  match: PropTypes.object.isRequired
}

export default Home
