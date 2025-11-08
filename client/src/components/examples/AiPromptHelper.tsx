import AiPromptHelper from '../AiPromptHelper'
import { Toaster } from '@/components/ui/toaster'

export default function AiPromptHelperExample() {
  return (
    <div className="p-6 max-w-3xl">
      <AiPromptHelper />
      <Toaster />
    </div>
  )
}
