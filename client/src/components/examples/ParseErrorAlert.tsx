import ParseErrorAlert from '../ParseErrorAlert'

export default function ParseErrorAlertExample() {
  return (
    <div className="p-6 max-w-2xl space-y-4">
      <ParseErrorAlert error="Could not detect format. Please paste valid JSON, CSV, or our Simple TXT format." />
      <ParseErrorAlert error="CSV Error: Row 5 is missing required headers (id, question, option_a, answer)." />
    </div>
  )
}
