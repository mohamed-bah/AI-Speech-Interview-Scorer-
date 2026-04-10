import { useState } from 'react'

export class MessageEventHandler {
  event = MessageEvent
}

export function useWorker(
  messageEventHandler = MessageEventHandler
) {
  const [worker] = useState(() => createWorker(messageEventHandler))
  return worker
}

function createWorker(messageEventHandler = MessageEventHandler){
  if (typeof window === 'undefined') return null

  const worker = new Worker(new URL('../lib/worker.js', import.meta.url), {
    type: 'module'
  })

  worker.addEventListener('message', messageEventHandler)
  return worker
}