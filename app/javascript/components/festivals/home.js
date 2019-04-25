import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import PageContent from '../../components/page_content'
import Loader from '../../components/shared/loader'
import Logo from '../../components/shared/logo'

export const HOMEPAGE_FRAGMENT = gql`
  fragment HomepageFragment on Festival {
    year
    startDate
    endDate
    pitchesOpen
    programmeLaunched
  }
`

export const HOMEPAGE_QUERY = gql`
  query Festival($year: ID!) {
    festival(year: $year) {
      ...HomepageFragment
    }
  }
  ${HOMEPAGE_FRAGMENT}
`

const Home = ({ match }) => {
  const { year } = match.params
  const { loading } = useQuery(HOMEPAGE_QUERY, { variables: { year } })

  return (
    <PageContent className="homepage page-content--no-padding">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Logo />
          <p className="homepage__purpose">
            <b>Please note: </b>
            This is the website for Festival participants and practitioners. For public ticket
            sales, general information, and media enquiries, please visit{' '}
            <a
              className="text-link"
              href="http://nzimprovfestival.co.nz/"
              target="_blank"
              rel="noopener noreferrer"
            >
              our public site
            </a>
            .
          </p>
        </>
      )}
    </PageContent>
  )
}

Home.propTypes = {
  match: PropTypes.object.isRequired
}

export default Home
