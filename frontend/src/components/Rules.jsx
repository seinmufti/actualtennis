const RULES = [
  'The last 5 minutes are for packing up and a quick court reset.',
  'One device can hold only one booking at a time.',
  'Be on time. The next crew starts right at the hour.',
  'No smoking on the court.',
  'Wear appropriate sport clothes and footwear.',
]

export default function Rules() {
  return (
    <section className="rules-card" aria-labelledby="rules-heading">
      <h2 id="rules-heading">Court rules</h2>
      <ol>
        {RULES.map((rule) => (
          <li key={rule}>{rule}</li>
        ))}
      </ol>
    </section>
  )
}
