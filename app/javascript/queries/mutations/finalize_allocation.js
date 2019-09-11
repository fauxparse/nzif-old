import gql from 'graphql-tag'

export default gql`
  mutation FinalizeAllocation($year: ID!, $lists: [AllocationList!]!) {
    finalizeAllocation(year: $year, lists: $lists)
  }
`
