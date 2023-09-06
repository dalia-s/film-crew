type Props = {
  show: boolean
  message?: string
  testId?: string
}

export default function ErrorMessage({ show, message = '', testId = '' }: Props) {
  const className = `error-message ${show ? 'visible' : ''}`
  return (
    <span className={className} role="alert" data-testid={testId}>
      {show ? message : ''}
    </span>
  )
}
