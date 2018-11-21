import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { split } from 'apollo-link'
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory'

const httpLink = createHttpLink({
  uri: `/graphql`,
  headers: {
    'X-CSRF-Token': document.querySelector('meta[name=csrf-token]').content,
  },
})

const cache = new InMemoryCache({
  dataIdFromObject: object => {
    switch (object.__typename) {
      case 'Festival': return `Festival:${object.year}`
      default: return defaultDataIdFromObject(object)
    }
  }
})

const client = new ApolloClient({
  cache,
  link: httpLink,
})

export default client
