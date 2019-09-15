import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocalStorageReducer } from 'lib/hooks'
import ConfirmationDialog from './dialog'
import ConfirmationContext from './context'

const ConfirmationManager = ({ children }) => {
  const [dontShow, dispatch] = useLocalStorageReducer('confirmations', (state, { type, show }) => ({
    ...state,
    [type]: show,
  }), {})

  const [open, setOpen] = useState(false)

  const [dialog, setDialog] = useState(null)

  useEffect(() => {
    if (dialog) {
      setOpen(true)
    }
  }, [dialog, setOpen])

  const type = dialog && dialog.type

  const showConfirmationDialog = useCallback((type, options = {}) => {
    const promise = new Promise((resolve, reject) => {
      if (dontShow[type]) {
        promise.resolve()
      } else {
        setDialog({
          type,
          options,
          onConfirm: () => resolve(),
          onCancel: () => reject(),
        })
      }
    }).finally(() => setOpen(false)).catch(() => {})

    return promise
  }, [dontShow, setDialog])

  const onDontShow = useCallback((show) => {
    dispatch({ type, show })
  }, [type, dispatch])

  const confirm = useCallback(() => dialog && dialog.onConfirm(), [dialog])

  const cancel = useCallback(() => dialog && dialog.onCancel(), [dialog])

  const context = useMemo(() => ({ confirm: showConfirmationDialog }), [showConfirmationDialog])

  const { message, ...options } = dialog ? dialog.options : {}

  return (
    <ConfirmationContext.Provider value={context}>
      {children}
      <ConfirmationDialog
        open={open}
        dontShow={type ? !!dontShow[type] : false}
        onDontShow={onDontShow}
        onConfirm={confirm}
        onCancel={cancel}
        {...options}
      >
        <p>
          {message}
        </p>
      </ConfirmationDialog>
    </ConfirmationContext.Provider>
  )
}

export default ConfirmationManager
