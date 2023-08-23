'use client'

import { useTranslations } from 'next-intl'
import { useClerk } from '@clerk/clerk-react'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import FaIcon from '@/components/icon'
import { deleteUser } from '@/utils/userService'

export default function Page() {
  const { signOut } = useClerk()

  const t = useTranslations('Forms.deleteUser')

  const onDelete = async () => {
    try {
      await deleteUser()
      signOut()
    } catch (e) {
      // TODO: show error message
    }
  }

  const onDeleteRequest = async () => {
    // TODO: replace alert with custom component
    // eslint-disable-next-line no-alert
    if (window.confirm(t('deleteConfirmationMsg')) === true) {
      onDelete()
    }
  }

  return (
    <div>
      {t('deleteAccountInstructions')}
      <FaIcon icon={faTrashCan} className="delete-icon" onClick={onDeleteRequest} />
    </div>
  )
}
