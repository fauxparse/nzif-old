import React, { useCallback, useState, useEffect } from 'react'
import ReactRouterPropTypes from 'react-router-prop-types'
import gql from 'graphql-tag'
import { useQuery, useMutation } from 'react-apollo-hooks'
import kebabCase from 'lodash/kebabCase'
import Loader from '../../shared/loader'
import Breadcrumbs from '../../shared/breadcrumbs'
import EditableTitle from '../../shared/editable_title'
import { Tab, TabBar } from '../../shared/tabs'
import { IconField, Input } from '../../form'
import SaveButton from '../../shared/save_button'
import noTransition from '../../page_transition/none'
import { CONTENTS_QUERY } from '../../../queries'
import Editor from './editor'
import Preview from './preview'

const CONTENT_FRAGMENT = gql`
  fragment ContentFragment on Content {
    title
    slug
    raw
    updatedAt
    versions {
      updatedAt
    }
  }
`

const CONTENT_QUERY = gql`
  query getContent($slug: String!) {
    content(slug: $slug) {
      ...ContentFragment
    }
  }

  ${CONTENT_FRAGMENT}
`

const UPDATE_CONTENT_MUTATION = gql`
  mutation UpdateContent($slug: String!, $attributes: ContentAttributes!) {
    updateContent(slug: $slug, attributes: $attributes) {
      ...ContentFragment
    }
  }

  ${CONTENT_FRAGMENT}
`

const ContentPage = ({ match, location, history }) => {
  const { loading, data: { content } = {} } = useQuery(
    CONTENT_QUERY,
    { variables: { slug: match.params.slug } }
  )

  const updateContent = useMutation(UPDATE_CONTENT_MUTATION);

  const back = match.url.replace(/\/[^/]+\/?$/, '')

  const tab = location.state && location.state.tab || 'edit'

  const [changed, setChanged] = useState(false)
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [raw, setRaw] = useState('')
  const [saving, setSaving] = useState(false)
  const [autoUpdateSlug, setAutoUpdateSlug] = useState(true)

  const titleChanged = useCallback((e) => {
    setTitle(e.target.value)
    setChanged(true)
    if (autoUpdateSlug) {
      setSlug(kebabCase(e.target.value.trim()))
    }
  }, [setTitle, setChanged, setSlug, autoUpdateSlug])

  const slugChanged = useCallback((e) => {
    setSlug(e.target.value)
    setChanged(true)
  }, [setSlug, setChanged])

  const rawChanged = useCallback((e) => {
    setRaw(e.target.value)
    setChanged(true)
  }, [setRaw, setChanged])

  useEffect(() => {
    if (content) {
      setTitle(content.title)
      setSlug(content.slug)
      setRaw(content.raw)
      setChanged(false)
      if (content.slug) {
        setAutoUpdateSlug(false)
      }
    }
  }, [content, setTitle, setSlug, setRaw, setChanged, setAutoUpdateSlug])

  const save = useCallback((newLocation) => new Promise((resolve, reject) => (
    Promise.all([
      updateContent({
        variables: {
          slug: match.params.slug,
          attributes: { title, slug, raw }
        },
        update: (proxy, { data: { updateContent } }) => {
          const { slug: newSlug } = updateContent
          proxy.writeQuery({
            query: CONTENT_QUERY,
            data: { content: updateContent },
            variables: { slug: newSlug },
          })

          if (newSlug != match.params.slug) {
            newLocation.pathname = newLocation.pathname.replace(/[^/]+$/, newSlug)
          }
        },
        errorPolicy: 'all',
        refetchQueries: [{ query: CONTENTS_QUERY }],
      }),
      new Promise(delayed => setTimeout(delayed, 1000)),
    ]).then(([{ errors = [] }]) => {
      if (errors.length) {
        reject(errors)
      } else {
        resolve(newLocation)
      }
    })
  )), [title, slug, raw, match, updateContent])

  const submit = useCallback((e) => {
    e.preventDefault()
    setSaving(true)
    save({ pathname: location.pathname })
      .then(newLocation => {
        setSaving(false)
        setChanged(false)
        history.replace(newLocation, { transition: noTransition })
      })
      .catch(() => {
        setSaving(false)
      })
  }, [setSaving, save, history, location])

  return (
    <form className="content__page" onSubmit={submit}>
      {loading ? <Loader /> : (
        <fieldset disabled={loading || saving}>
          <header>
            <Breadcrumbs back={back}>
              <Breadcrumbs.Link to={back}>Content</Breadcrumbs.Link>
            </Breadcrumbs>
            <EditableTitle
              live
              value={title}
              onChange={titleChanged}
              placeholder="Title"
            />
            <IconField className="content__slug" icon="link" label="URL">
              <Input value={slug} placeholder="content-id" onChange={slugChanged} />
              <SaveButton
                primary
                saving={saving}
                disabled={!changed}
                type="submit"
              />
            </IconField>
          </header>
          <TabBar>
            <Tab
              to={{ pathname: location.pathname, state: { tab: 'edit' } }}
              isActive={() => tab === 'edit'}
            >
              Edit
            </Tab>
            <Tab
              to={{ pathname: location.pathname, state: { tab: 'preview' } }}
              isActive={() => tab === 'preview'}
            >
              Preview
            </Tab>
          </TabBar>
          {tab === 'edit' && <Editor value={raw} onChange={rawChanged} />}
          {tab === 'preview' && <Preview text={raw} />}
        </fieldset>
      )}
    </form>
  )
}

ContentPage.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
}

export default ContentPage
