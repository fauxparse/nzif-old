import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import difference from 'lodash/difference'
import Select from './select'

const COUNTRIES_QUERY = gql`{ countries }`

const PRIORITY_COUNTRIES = ['New Zealand', 'Australia']

const sortCountries = (countries) => [
  ...PRIORITY_COUNTRIES,
  '---',
  ...difference(countries, PRIORITY_COUNTRIES)
]

const CountrySelect = ({ value, disabled, ...props }) => (
  <Query query={COUNTRIES_QUERY}>
    {({ loading, data: { countries = [value] } = [] }) => (
      <Select
        value={value}
        options={sortCountries(countries)}
        disabled={disabled || loading}
        {...props}
      />
    )}
  </Query>
)

export default CountrySelect