import { useState } from 'react'
import QuestionCard from '../QuestionCard'

export default function QuestionCardExample() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="p-6 max-w-2xl">
      <QuestionCard
        question="What is the primary purpose of React hooks?"
        options={{
          a: 'To replace class components entirely',
          b: 'To allow state and lifecycle features in function components',
          c: 'To improve rendering performance',
          d: 'To handle routing in React applications'
        }}
        selectedAnswer={selected}
        onSelectAnswer={setSelected}
      />
    </div>
  )
}
