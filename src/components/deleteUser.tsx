'use client'

// import { useTranslations } from 'next-intl'
import { useClerk } from '@clerk/clerk-react'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import FaIcon from '@/components/icon'

export default function Page() {
  const { signOut } = useClerk()

  // const t = useTranslations('PageNames')

  const onDelete = async () => {
    const resp = await fetch('/api/user', {
      method: 'DELETE',
    })
    if (resp.ok) {
      signOut()
    }
  }

  const onDeleteRequest = async () => {
    // TODO: replace alert with custom component
    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure you want to delete your account?') === true) {
      onDelete()
    }
  }

  return (
    <div>
      To permanently delete your account and all of the associated data, please click here:
      <FaIcon icon={faTrashCan} className="delete-icon" onClick={onDeleteRequest} />
    </div>
  )
}
