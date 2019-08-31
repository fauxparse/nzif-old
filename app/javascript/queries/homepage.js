import gql from 'graphql-tag'

export const HOMEPAGE_FRAGMENT = gql`
  fragment HomepageFragment on Festival {
    year
    startDate
    endDate
    state
    deadline
    root
    adminRoot
    panic
  }
`

export const HOMEPAGE_QUERY = gql`
  query Festival($year: ID!) {
    festival(year: $year) {
      ...HomepageFragment
    }

    registration(year: $year) {
      state
    }
  }
  ${HOMEPAGE_FRAGMENT}
`
