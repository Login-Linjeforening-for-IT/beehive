'use client'

import { useEffect } from 'react'
import useGptPageState from '@components/gpt/useGptPageState'

export default function PageClient({ id }: { id: string }) {
    const { isConnected, clients, restoreChat, chatSession } = useGptPageState()

    useEffect(() => {
        if (!isConnected) return
        if (!clients.length) return

        restoreChat(id)
    }, [id, isConnected, clients.length, restoreChat])

    return (
        <div>
            <h1>Login GPT</h1>
            <h1>{id}</h1>
            <div>
                {chatSession?.messages.map((message) => (
                    <h1 key={message.id}>{message.content}</h1>
                ))}
            </div>
        </div>
    )
}
