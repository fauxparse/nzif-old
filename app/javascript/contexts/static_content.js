import React, { createContext, useCallback, useContext, useMemo, useReducer } from 'react'
import PropTypes from 'lib/proptypes'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import humanize from 'lib/humanize'
import moment from 'lib/moment'
import { lorem } from 'faker'

const CONTENT_QUERY = gql`
  query getContent($slug: String!) {
    content(slug: $slug) {
      title
      slug
      raw
      updatedAt
    }
  }
`

export const StaticContentContext = createContext({})

export const DummyLoader = ({ children }) => {
  const load = (slug) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({
        title: humanize(slug),
        slug,
        raw: lorem.paragraphs(10),
        updatedAt: moment().toISOString(),
      }), 1000)
    })
  }
  return React.cloneElement(children, { load })
}

export const ApolloLoader = withApollo(({ client, children }) => {
  const load = useCallback((slug) => new Promise((resolve, reject) => {
    client.query({
      query: CONTENT_QUERY,
      variables: { slug },
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    })
      .then(({ data }) => resolve(data.content))
      .catch(e => reject(e))
  }), [client])
  return React.cloneElement(children, { load })
})

export const StaticContentLibrary = ({ load, children }) => {
  const [library, dispatch] = useReducer((state, { type, slug, ...content }) => {
    switch (type) {
      case 'load':
        return { ...state, [slug]: { loading: true } }
      case 'loaded':
        return { ...state, [slug]: { loading: false, ...content } }
      default:
        return state
    }
  }, {})

  const request = useCallback((slug) => {
    if (!library[slug]) {
      dispatch({ type: 'load', slug })
      load(slug)
        .then(content => dispatch({ type: 'loaded', slug, ...content }))
        .catch(error => dispatch({ type: 'loaded', slug, error }))
    }

    return library[slug] || { loading: true }
  }, [library, load, dispatch])

  return (
    <StaticContentContext.Provider value={{ library, request }}>
      {children}
    </StaticContentContext.Provider>
  )
}

StaticContentLibrary.propTypes = {
  load: PropTypes.func,
}

export const StaticContentProvider = ({ loader: Loader = ApolloLoader, children }) => (
  <Loader>
    <StaticContentLibrary>
      {children}
    </StaticContentLibrary>
  </Loader>
)

StaticContentProvider.propTypes = {
  loader: PropTypes.component,
}

export const useStaticContent = (slug) => {
  const { request } = useContext(StaticContentContext)

  const { loading, ...content } = useMemo(() => request(slug), [request, slug])

  return { loading, ...content }
}
