'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useClerk } from '@clerk/clerk-react'
import { faTrashCan, faSpinner } from '@fortawesome/free-solid-svg-icons'
import FaIcon from '@/components/icon'
import { deleteUser } from '@/utils/userService'

export function DeleteUserComponent() {
  const [deleting, setDeleting] = useState(false)
  const { signOut } = useClerk()

  const t = useTranslations('Forms.deleteUser')

  const onDelete = async () => {
    try {
      setDeleting(true)
      await deleteUser()
      signOut()
    } catch (e) {
      // TODO: show error message
    } finally {
      setDeleting(false)
    }
  }

  const onDeleteRequest = () => {
    // TODO: replace alert with custom component
    // eslint-disable-next-line no-alert
    if (window.confirm(t('deleteConfirmationMsg')) === true) {
      onDelete()
    }
  }

  return (
    <div className="delete-user-component" data-testid="delete-user-element">
      {t('deleteAccountInstructions')}
      {deleting ? (
        <FaIcon icon={faSpinner} className="fa-pulse" />
      ) : (
        <button type="button" className="button no-style" onClick={onDeleteRequest} data-testid="delete-user-button">
          <FaIcon icon={faTrashCan} className="delete-icon" />
        </button>
      )}
    </div>
  )
}

export default DeleteUserComponent
