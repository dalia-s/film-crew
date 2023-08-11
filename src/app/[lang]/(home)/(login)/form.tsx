import Link from 'next/link'
import Modal from '@/components/modalWindow'
import { Locale } from '@/utils/i18n-config'

type Props = {
  lang: Locale
}

export default function ModalForm({ lang }: Props) {
  return (
    <Modal>
      <div className="form-container">
        <Link href={`/${lang}/`}>Close</Link>
      </div>
    </Modal>
  )
}
