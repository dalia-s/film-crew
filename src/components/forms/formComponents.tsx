type ErrorMessageProps = {
  show: boolean
  message?: string
}

export default function ErrorMessage({ show, message }: ErrorMessageProps) {
  const className = `error-message ${show ? 'visible' : ''}`
  return (
    <span className={className} role="alert">
      {message || ''}
    </span>
  )
}
