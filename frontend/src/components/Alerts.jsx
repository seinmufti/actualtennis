export default function Alerts({ loadError, actionError }) {
  if (!loadError && !actionError) return null

  return (
    <section className="alerts" aria-live="polite">
      {loadError ? <p className="banner error">{loadError}</p> : null}
      {actionError ? <p className="banner error">{actionError}</p> : null}
    </section>
  )
}
