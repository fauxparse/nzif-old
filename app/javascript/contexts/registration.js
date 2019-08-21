import React, {
  cloneElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import isEqual from 'lodash/isEqual'
import { useDeepMemo, useDeepState } from 'lib/hooks'
import PropTypes from 'lib/proptypes'
import dummyWorkshops from 'templates/activities/overview/dummy'

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

  const workshops = useRef(dummyWorkshops())

  const [registration, setRegistration] = useDeepState({
    preferences: [],
  })

  const save = useCallback((changes = {}, force = false) => {
    const changed = { ...registration, ...changes }
    if (force || !isEqual(registration, changed)) {
      setSaving(true)
      return setTimeout(() => {
        setRegistration(changed)
        setSaving(false)
      }, delay)
    }
  }, [delay, registration, setRegistration, setSaving])

  useEffect(() => {
    setLoading(true)
    const timeout = setTimeout(() => {
      setRegistration({
        ...registration,
        preferences: [
          [workshops.current[0].activities[1].id, 1],
          [workshops.current[0].activities[0].id, 2],
          [workshops.current[0].activities[3].id, 3],
          [workshops.current[1].activities[2].id, 1],
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
      workshops: workshops.current,
      registration,
    },
    save,
  })
}

DummyLoader.proptypes = {
  delay: PropTypes.number,
}

const RegistrationMemoizer = ({ value, save, children }) => {
  const [unsavedChanges, setUnsavedChanges] = useDeepState({})

  const addUnsavedChanges = useCallback((changes) => {
    setUnsavedChanges({ ...unsavedChanges, ...changes })
  }, [unsavedChanges, setUnsavedChanges])

  const saveChanges = useCallback(() => save(unsavedChanges), [save, unsavedChanges])

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
      preferences: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired,
    }).isRequired,
  }),
  save: PropTypes.func.isRequired,
}

export const RegistrationProvider = ({ loader: Loader = DummyLoader, children, ...props }) => (
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
