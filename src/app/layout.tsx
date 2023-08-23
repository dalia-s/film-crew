import 'react-datepicker/dist/react-datepicker.css'
import '@/styles/normalize.css'
import '@/styles/global.scss'

type Props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return children
}
