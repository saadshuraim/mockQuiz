import QuestionPreviewCard from '../QuestionPreviewCard'

export default function QuestionPreviewCardExample() {
  const question = {
    id: 'q1',
    question: 'What is the capital of France?',
    options: {
      a: 'London',
      b: 'Paris',
      c: 'Berlin',
      d: 'Madrid'
    },
    answer: 'b',
    explanation: 'Paris has been the capital of France since 987 AD.'
  }

  return (
    <div className="p-6 max-w-2xl">
      <QuestionPreviewCard question={question} index={0} />
    </div>
  )
}
