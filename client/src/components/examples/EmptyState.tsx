import EmptyState from '../EmptyState'
import { BookOpen } from 'lucide-react'

export default function EmptyStateExample() {
  return (
    <div className="p-6">
      <EmptyState
        icon={BookOpen}
        title="No quizzes yet"
        description="Create your first quiz to get started. Use AI to generate questions or upload your own."
        actionLabel="Create New Quiz"
        onAction={() => console.log('Create quiz clicked')}
      />
    </div>
  )
}
