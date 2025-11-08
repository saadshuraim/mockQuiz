import ResultCard from '../ResultCard'

export default function ResultCardExample() {
  return (
    <div className="p-6 max-w-md space-y-4">
      <ResultCard
        id="1"
        quizTitle="JavaScript Fundamentals"
        score={12}
        totalQuestions={15}
        finishedAt={Date.now() - 3600000}
      />
      <ResultCard
        id="2"
        quizTitle="React Hooks Deep Dive"
        score={5}
        totalQuestions={10}
        finishedAt={Date.now() - 86400000}
      />
    </div>
  )
}
