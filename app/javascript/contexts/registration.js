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
import entries from 'lodash/entries'
import groupBy from 'lodash/groupBy'
import sortBy from 'lodash/sortBy'
import first from 'lodash/first'
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
  5500,
  10500,
  15000,
  19500,
  23500,
  27000,
  30000,
  32500,
  35000,
  37000,
  39000,
  40000,
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
  })

  const save = useCallback((changes = {}, force = false) => {
    return new Promise((resolve) => {
      const changed = { ...registration, ...changes }
      if (force || !isEqual(registration, changed)) {
        setSaving(true)
        return setTimeout(() => {
          setRegistration(changed)
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
          { sessionId: sessions.current[0].activities[1].id, position: 1 },
          { sessionId: sessions.current[0].activities[0].id, position: 1 },
          { sessionId: sessions.current[0].activities[3].id, position: 1 },
          { sessionId: sessions.current[1].activities[2].id, position: 1 },
        ],
      })
      setLoading(false)
    }, delay)
    return () => clearTimeout(timeout)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return cloneElement(children, {
    value: {
      loading,
      saving,
      prices: PRICES,
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
    sortBy(
      entries(
        groupBy(
          data.festival.sessions.map((session) => ({
            ...session.activity,
            id: session.id, // TODO: remove
            startsAt: moment(session.startsAt),
            endsAt: moment(session.endsAt),
          })),
          session => session.startsAt.format('YYYY-MM-DD'),
        )
      ),
      [first]
    ).map(([date, activities]) => ({ date: moment(date), activities }))
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
          updateRegistration({ variables: { year, attributes } }),
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
      registration,
      errors,
    },
    save,
  })
}

const RegistrationMemoizer = ({ value, save, children }) => {
  const [unsavedChanges, setUnsavedChanges] = useDeepState({})

  const [valid, setValid] = useState(true)

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
    valid,
    setValid,
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
