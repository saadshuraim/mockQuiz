import QuizProgress from '../QuizProgress'

export default function QuizProgressExample() {
  return (
    <div className="p-6 max-w-2xl space-y-6">
      <QuizProgress current={1} total={10} />
      <QuizProgress current={5} total={10} />
      <QuizProgress current={10} total={10} />
    </div>
  )
}
