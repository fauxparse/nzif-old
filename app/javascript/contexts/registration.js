import React, {
  cloneElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import omit from 'lodash/omit'
import { random } from 'faker'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { useDeepMemo, useDeepState } from 'lib/hooks'
import PropTypes from 'lib/proptypes'
import moment from 'lib/moment'
import fakeDelay from 'lib/fakeDelay'
import FestivalContext from 'contexts/festival'
import dummyWorkshops from 'templates/activities/overview/dummy'
import REGISTRATION_FORM from 'queries/registration_form'
import UPDATE_REGISTRATION from 'queries/mutations/update_registration'

export const RegistrationContext = createContext({})

const PRICES = [
  0,
  6400,
  11200,
  16000,
  20800,
  25600,
  30400,
  35200,
  40000,
  44800,
  49600,
  54400,
  59200,
]

const ALL_IN = [
  '2019-10-11T21:00:00+13:00',
  '2019-10-12T21:00:00+13:00',
  '2019-10-15T21:00:00+13:00',
  '2019-10-16T21:00:00+13:00',
  '2019-10-18T21:00:00+13:00',
]

export const DummyLoader = ({ delay = 1000, children }) => {
  const [loading, setLoading] = useState(true)

  const [saving, setSaving] = useState(false)

  const sessions = useRef(dummyWorkshops())

  const [registration, setRegistration] = useDeepState({
    name: '',
    email: '',
    phone: '',
    preferences: [],
    availability: [],
  })

  const save = useCallback((changes = {}, force = false) => {
    return new Promise((resolve) => {
      const changed = { ...registration, ...changes }
      if (force || !isEqual(registration, changed)) {
        setSaving(true)
        return setTimeout(() => {
          setRegistration({
            ...changed,
            id: changed.name ? 1 : null,
          })
          setSaving(false)
          resolve()
        }, delay)
      } else {
        resolve()
      }
    })
  }, [delay, registration, setRegistration, setSaving])

  useEffect(() => {
    setLoading(true)
    const timeout = setTimeout(() => {
      setRegistration({
        ...registration,
        preferences: [
          { sessionId: sessions.current[1].id, position: 1 },
          { sessionId: sessions.current[0].id, position: 1 },
          { sessionId: sessions.current[3].id, position: 1 },
          { sessionId: sessions.current[6].id, position: 1 },
        ],
      })
      setLoading(false)
    }, delay)
    return () => clearTimeout(timeout)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const allInShows = useMemo(() => ALL_IN.map(t => {
    const id = random.uuid()
    const startsAt = moment(t)
    return { id, startsAt, endsAt: startsAt.clone().add(1, 'hour') }
  }), [])

  return cloneElement(children, {
    value: {
      loading,
      saving,
      prices: PRICES,
      allInShows,
      sessions: sessions.current,
      registration,
      errors: {},
    },
    save,
  })
}

DummyLoader.proptypes = {
  delay: PropTypes.number,
}

export const ApolloLoader = ({ children }) => {
  const festival = useContext(FestivalContext)

  const { year } = festival

  const { loading, data } = useQuery(REGISTRATION_FORM, { variables: { year } })

  const sessions = useMemo(() => ((data && data.festival) ? (
    data.festival.sessions.map((session) => ({
      ...session,
      startsAt: moment(session.startsAt),
      endsAt: moment(session.endsAt),
    }))
  ) : []), [data])

  const allInShows = useMemo(() => ((data && data.festival) ? (
    data.festival.activities.reduce((list, show) => [
      ...list,
      ...show.sessions.map(session => ({
        ...session,
        startsAt: moment(session.startsAt),
        endsAt: moment(session.endsAt),
      })),
    ], [])
  ) : []), [data])

  const registration = useMemo(() => (data.registration || {
    prices: [0],
    preferences: [],
  }), [data])

  const [saving, setSaving] = useState(false)

  const [errors, setErrors] = useState({})

  const updateRegistration = useMutation(UPDATE_REGISTRATION, {
    update: (cache, { data: { updateRegistration } }) => {
      const variables = { year }
      const existing = cache.readQuery({ query: REGISTRATION_FORM, variables })
      cache.writeQuery({
        query: REGISTRATION_FORM,
        variables,
        data: {
          ...existing,
          registration: {
            ...existing.registration,
            ...updateRegistration,
          },
        },
      })
    },
  })

  const save = useCallback((attributes = {}, force = false) => {
    return new Promise((resolve, reject) => {
      if (force || !isEmpty(attributes)) {
        setSaving(true)
        setErrors({})
        Promise.all([
          updateRegistration({
            variables: { year, attributes: omit(attributes, ['id', 'prices']) }
          }),
          fakeDelay(1500),
        ])
          .then(() => {
            setSaving(false)
            resolve()
          })
          .catch(({ graphQLErrors }) => {
            setErrors(graphQLErrors[0].detail)
            setSaving(false)
            reject()
          })
      } else {
        resolve()
      }
    })
  }, [year, setSaving, setErrors, updateRegistration])

  return cloneElement(children, {
    value: {
      loading,
      saving,
      prices: registration.prices,
      sessions,
      allInShows,
      registration,
      errors,
    },
    save,
  })
}

const RegistrationMemoizer = ({ value, save, children }) => {
  const [unsavedChanges, setUnsavedChanges] = useDeepState({})

  const addUnsavedChanges = useCallback((changes) => {
    setUnsavedChanges({ ...unsavedChanges, ...changes })
  }, [unsavedChanges, setUnsavedChanges])

  const saveChanges = useCallback((force = false) => (
    save(unsavedChanges, force).then(() => setUnsavedChanges({}))
  ), [save, unsavedChanges, setUnsavedChanges])

  const cache = useDeepMemo(() => ({
    ...value,
    registration: {
      ...value.registration,
      ...unsavedChanges,
    },
    change: addUnsavedChanges,
    save: saveChanges,
  }), [value, unsavedChanges, addUnsavedChanges, saveChanges])

  return (
    <RegistrationContext.Provider value={cache}>
      {children}
    </RegistrationContext.Provider>
  )
}

RegistrationMemoizer.propTypes = {
  value: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    prices: PropTypes.arrayOf(PropTypes.number),
    registration: PropTypes.shape({
      preferences: PropTypes.arrayOf(PropTypes.shape({
        sessionId: PropTypes.id.isRequired,
        position: PropTypes.number.isRequired,
      }).isRequired).isRequired,
    }).isRequired,
  }),
  save: PropTypes.func,
}

export const RegistrationProvider = ({ loader: Loader = ApolloLoader, children, ...props }) => (
  <Loader {...props}>
    <RegistrationMemoizer>
      {children}
    </RegistrationMemoizer>
  </Loader>
)

RegistrationProvider.propTypes = {
  loader: PropTypes.component,
}

export const useRegistration = () => useContext(RegistrationContext)

export default RegistrationContext
