'use client'

export default function GlobalError({
  // error,
  reset,
}: {
  // error: Error
  reset: () => void
}) {
  return (
    <html lang="en">
      <body>
        <h2>Something went wrong! This is Global Error page</h2>
        <button type="button" onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}
