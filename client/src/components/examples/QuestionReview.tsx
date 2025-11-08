import QuestionReview from '../QuestionReview'

export default function QuestionReviewExample() {
  return (
    <div className="p-6 max-w-2xl space-y-4">
      <QuestionReview
        question="What is the capital of France?"
        options={{
          a: 'London',
          b: 'Paris',
          c: 'Berlin',
          d: 'Madrid'
        }}
        userAnswer="b"
        correctAnswer="b"
        explanation="Paris has been the capital of France since 987 AD."
        index={0}
      />
      <QuestionReview
        question="What is 2 + 2?"
        options={{
          a: '3',
          b: '4',
          c: '5',
          d: '22'
        }}
        userAnswer="c"
        correctAnswer="b"
        explanation="2 + 2 equals 4."
        index={1}
      />
    </div>
  )
}
