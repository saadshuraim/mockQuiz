import ScoreSummary from '../ScoreSummary'

export default function ScoreSummaryExample() {
  return (
    <div className="p-6 max-w-2xl space-y-6">
      <ScoreSummary
        score={8}
        totalQuestions={10}
        quizTitle="JavaScript Fundamentals"
      />
      <ScoreSummary
        score={4}
        totalQuestions={10}
        quizTitle="React Advanced Patterns"
      />
    </div>
  )
}
