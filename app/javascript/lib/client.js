import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { ApolloLink, split } from 'apollo-link'
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
  defaultDataIdFromObject,
} from 'apollo-cache-inmemory'
import fetch from 'unfetch'
import ActionCable from 'actioncable'
import ActionCableLink from 'graphql-ruby-client/subscriptions/ActionCableLink'
import { getMainDefinition } from 'apollo-utilities'
import stripTypenames from './strip_typenames'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [
        {
          kind: 'INTERFACE',
          name: 'Activity',
          possibleTypes: [
            {
              name: 'Show'
            },
            {
              name: 'Workshop'
            },
            {
              name: 'SocialEvent'
            },
            {
              name: 'Forum'
            }
          ]
        }
      ]
    }
  }
})

const cache = new InMemoryCache({
  fragmentMatcher,
  dataIdFromObject: object => {
    switch (object.__typename) {
      case 'Festival':
        return `Festival:${object.year}`
      case 'PitchPresenter':
        return null
      default:
        return defaultDataIdFromObject(object)
    }
  }
})

const httpLink = createHttpLink({
  fetch,
  uri: `/graphql`,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-Token': document.querySelector('meta[name=csrf-token]').content,
  },
  credentials: 'same-origin',
})

const protocol = window.location.protocol.replace(/^http/, 'ws')
const cable = ActionCable.createConsumer(`${protocol}//${window.location.host}/subscriptions`)
const actionCableLink =  new ActionCableLink({ cable })

const stripTypenameLink = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    operation.variables = stripTypenames(operation.variables)
  }

  return forward(operation)
})

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
  link: ApolloLink.from([stripTypenameLink, link]),
})

export default client
