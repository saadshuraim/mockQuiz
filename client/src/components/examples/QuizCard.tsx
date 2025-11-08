import QuizCard from '../QuizCard'

export default function QuizCardExample() {
  return (
    <div className="p-6 max-w-md">
      <QuizCard
        id="1"
        title="JavaScript Fundamentals"
        description="Test your knowledge of core JavaScript concepts including variables, functions, and arrays"
        questionCount={15}
        lastTaken={Date.now() - 86400000 * 2}
      />
    </div>
  )
}
