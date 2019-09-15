import { useContext } from 'react'
import ConfirmationDialog from './dialog'
import ConfirmationContext from './context'
import ConfirmationManager from './manager'

export { ConfirmationContext, ConfirmationManager }

export const useConfirmation = () => useContext(ConfirmationContext)

export default ConfirmationDialog
