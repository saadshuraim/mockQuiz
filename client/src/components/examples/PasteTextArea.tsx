import { useState } from 'react'
import PasteTextArea from '../PasteTextArea'

export default function PasteTextAreaExample() {
  const [text, setText] = useState('')

  return (
    <div className="p-6 max-w-3xl">
      <PasteTextArea value={text} onChange={setText} />
    </div>
  )
}
