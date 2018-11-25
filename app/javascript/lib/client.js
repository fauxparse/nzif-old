import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { split } from 'apollo-link'
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory'
import ActionCable from 'actioncable'
import ActionCableLink from 'graphql-ruby-client/subscriptions/ActionCableLink'
import { getMainDefinition } from 'apollo-utilities'

const cache = new InMemoryCache({
  dataIdFromObject: object => {
    switch (object.__typename) {
      case 'Festival': return `Festival:${object.year}`
      default: return defaultDataIdFromObject(object)
    }
  }
})

const httpLink = createHttpLink({
  uri: `/graphql`,
  headers: {
    'X-CSRF-Token': document.querySelector('meta[name=csrf-token]').content,
  },
})

const cable = ActionCable.createConsumer('ws://localhost:3000/subscriptions')
const actionCableLink =  new ActionCableLink({ cable })

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  actionCableLink,
  httpLink
)

const client = new ApolloClient({
  cache,
  link,
})

export default client
