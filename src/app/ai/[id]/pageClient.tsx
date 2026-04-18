'use client'

import en from '@text/ai/en.json'
import no from '@text/ai/no.json'
import { ArrowUp, Bot, MessageSquarePlus } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import useGptPageState from '@components/gpt/useGptPageState'
import findHighestTPSClient from '@utils/findHighestTPSClient'

const SCROLL_FOLLOW_THRESHOLD = 96

export default function PageClient({ id, lang }: { id: string, lang: Lang }) {
    const {
        chatSession,
        clients,
        conversations,
        isConnected,
        isLoadingChat,
        isLoadingConversations,
        restoreChat,
        sendPrompt,
        switchConversationClient
    } = useGptPageState()
    const text = (lang === 'no' ? no : en).conversation
    const [input, setInput] = useState('')
    const [selectedClient, setSelectedClient] = useState('')
    const [isSwitching, setIsSwitching] = useState(false)
    const router = useRouter()
    const messageViewportRef = useRef<HTMLDivElement | null>(null)
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    const shouldFollowRef = useRef(true)
    const hasPlacedInitialScrollRef = useRef(false)

    useEffect(() => {
        void restoreChat(id)
    }, [id, restoreChat])

    useEffect(() => {
        hasPlacedInitialScrollRef.current = false
        shouldFollowRef.current = true
    }, [id])

    useEffect(() => {
        const textarea = textareaRef.current
        if (!textarea) {
            return
        }

        textarea.style.height = '0px'
        textarea.style.height = `${Math.min(textarea.scrollHeight, 240)}px`
    }, [input])

    useEffect(() => {
        const viewport = messageViewportRef.current
        if (!viewport) {
            return
        }

        const handleScroll = () => {
            const distanceFromBottom = viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight
            shouldFollowRef.current = distanceFromBottom < SCROLL_FOLLOW_THRESHOLD
        }

        handleScroll()
        viewport.addEventListener('scroll', handleScroll)

        return () => viewport.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const viewport = messageViewportRef.current
        if (!viewport || !chatSession) {
            return
        }

        if (!hasPlacedInitialScrollRef.current) {
            viewport.scrollTop = viewport.scrollHeight
            hasPlacedInitialScrollRef.current = true
            shouldFollowRef.current = true
            return
        }

        if (chatSession.isSending && shouldFollowRef.current) {
            viewport.scrollTo({
                top: viewport.scrollHeight,
                behavior: 'smooth',
            })
        }
    }, [chatSession?.conversationId, chatSession?.isSending, chatSession?.messages])

    const isActiveClientAvailable = useMemo(() => {
        if (!chatSession) {
            return false
        }

        return clients.some((client) => client.name === chatSession.clientName)
    }, [chatSession, clients])

    const fallbackClient = useMemo(() => {
        if (!clients.length) {
            return null
        }

        return findHighestTPSClient(clients)
    }, [clients])

    useEffect(() => {
        if (!selectedClient && fallbackClient) {
            setSelectedClient(fallbackClient.name)
        }
    }, [fallbackClient, selectedClient])

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (!chatSession || !input.trim() || !isActiveClientAvailable) {
            return
        }

        shouldFollowRef.current = true

        const didSend = sendPrompt(input, chatSession)
        if (didSend) {
            setInput('')
        }
    }

    async function handleSwitchClient() {
        if (!chatSession || !selectedClient) {
            return
        }

        try {
            setIsSwitching(true)
            shouldFollowRef.current = true
            await switchConversationClient(chatSession.conversationId, selectedClient)
        } finally {
            setIsSwitching(false)
        }
    }

    function getConversationClassName(isActive: boolean) {
        return isActive
            ? 'border-(--color-primary) bg-(--color-bg-body)'
            : `border-transparent bg-transparent
                hover:border-(--color-border-default)
                hover:bg-(--color-bg-body)`
    }

    return (
        <div>
            <div className='page-section--without-gaps h-[calc(100vh-var(--h-topbar))]'>
                <div className='grid h-full min-h-0 grid-cols-1 1000px:grid-cols-[18rem_minmax(0,1fr)]'>
                    <aside
                        className='flex min-h-0 flex-col border-b border-(--color-border-default)
                            bg-(--color-bg-surface) px-4 py-4 1000px:border-r
                            1000px:border-b-0 1000px:px-5'
                    >
                        <Link
                            href='/ai'
                            className='flex items-center gap-2 rounded-lg
                                py-2 text-sm font-semibold text-(--color-text-main)
                                transition hover:bg-(--color-bg-main)'
                        >
                            <MessageSquarePlus className='h-4 w-4' />
                            {text.newChat}
                        </Link>

                        <div className='mt-5 flex items-center justify-between'>
                            <h2 className='text-xs font-semibold tracking-[0.18em] text-(--color-text-discreet)'>
                                {text.previousChats}
                            </h2>
                            <span className='text-xs text-(--color-text-discreet)'>
                                {isLoadingConversations ? text.loading : conversations.length}
                            </span>
                        </div>

                        <div className='mt-4 flex-1 space-y-2 overflow-y-auto pr-1'>
                            {conversations.map((conversation) => {
                                const isActive = conversation.id === id

                                return (
                                    <button
                                        key={conversation.id}
                                        onClick={() => router.push(`/ai/${conversation.id}`)}
                                        className={`w-full p-3 rounded-lg
                                            text-left transition cursor-pointer
                                         ${getConversationClassName(isActive)}`}
                                    >
                                        <div className='flex items-start justify-between gap-3'>
                                            <p className='line-clamp-2 text-sm font-semibold text-(--color-text-main)'>
                                                {conversation.title}
                                            </p>
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    </aside>

                    <section className='flex min-h-0 flex-col bg-(--color-bg-main)'>
                        {!isActiveClientAvailable && chatSession ? (
                            <div className='border-b border-(--color-border-default) bg-amber-50/50 px-5 py-4 1000px:px-8'>
                                <div className='flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between'>
                                    <div>
                                        <p className='font-semibold text-amber-900'>
                                            {chatSession.clientName} {text.modelUnavailable}
                                        </p>
                                        <p className='mt-1 text-sm text-amber-800'>
                                            {text.handoffDescription}
                                        </p>
                                    </div>

                                    <div className='flex flex-col gap-2 sm:flex-row'>
                                        <select
                                            value={selectedClient}
                                            onChange={(event) => setSelectedClient(event.target.value)}
                                            className='rounded-(--border-radius) border border-amber-300
                                                bg-white px-3 py-2 text-sm text-slate-900 outline-none'
                                        >
                                            {clients.map((client) => (
                                                <option key={client.name} value={client.name}>
                                                    {client.name}
                                                </option>
                                            ))}
                                        </select>
                                        <button
                                            type='button'
                                            onClick={handleSwitchClient}
                                            disabled={!selectedClient || isSwitching || !clients.length}
                                            className='rounded-(--border-radius) bg-amber-500 px-4 py-2
                                                text-sm font-semibold text-white
                                                disabled:cursor-not-allowed disabled:opacity-60'
                                        >
                                            {isSwitching ? text.switching : text.continueOnAnotherModel}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : null}

                        <div
                            ref={messageViewportRef}
                            className='flex-1 overflow-y-auto px-5 py-5 1000px:px-8'
                        >
                            {isLoadingChat ? (
                                <div className='flex h-full items-center justify-center text-sm text-(--color-text-discreet)'>
                                    {text.loadingConversation}
                                </div>
                            ) : !chatSession ? (
                                <div className='flex h-full flex-col items-center justify-center gap-3 text-center'>
                                    <Bot className='h-10 w-10 text-(--color-primary)' />
                                    <div>
                                        <p className='font-semibold text-(--color-text-main)'>
                                            {text.notFoundTitle}
                                        </p>
                                        <p className='text-sm text-(--color-text-discreet)'>
                                            {text.notFoundDescription}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className='mx-auto flex min-h-full w-full max-w-5xl flex-col justify-end gap-4'>
                                    {chatSession.messages.map((message) => (
                                        <article
                                            key={message.id}
                                            className={`max-w-[90%] rounded-(--border-radius-large)
                                                px-4 py-3 ${getMessageClassName(message)}`}
                                        >
                                            <div
                                                className='mb-2 flex items-center gap-2 text-[0.7rem]
                                                    font-semibold uppercase tracking-[0.18em] opacity-70'
                                            >
                                                <span>{message.role}</span>
                                                {message.clientName ? <span>{message.clientName}</span> : null}
                                                {message.pending ? <span>{text.thinking}</span> : null}
                                            </div>
                                            <div
                                                className='prose prose-sm max-w-none text-current
                                                    prose-p:my-2 prose-pre:overflow-x-auto
                                                    prose-pre:rounded-(--border-radius)
                                                    prose-pre:bg-black/80 prose-pre:p-4'
                                            >
                                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                    {message.content || '...'}
                                                </ReactMarkdown>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className='px-5 py-4 1000px:px-8'>
                            <form
                                onSubmit={handleSubmit}
                                className='mx-auto flex w-full max-w-5xl items-end gap-3
                                    rounded-full border
                                    border-(--color-border-default) bg-(--color-bg-surface) p-2 px-6'
                            >
                                <textarea
                                    ref={textareaRef}
                                    rows={1}
                                    value={input}
                                    disabled={!chatSession || !isActiveClientAvailable || chatSession.isSending}
                                    onChange={(event) => setInput(event.target.value)}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter' && !event.shiftKey) {
                                            event.preventDefault()
                                            event.currentTarget.form?.requestSubmit()
                                        }
                                    }}
                                    placeholder={chatSession && isActiveClientAvailable
                                        ? text.askFollowup
                                        : text.connectToModel}
                                    className='min-h-7.5 w-full resize-none overflow-y-auto bg-transparent outline-none'
                                />
                                <button
                                    type='submit'
                                    disabled={
                                        !input.trim()
                                        || !chatSession
                                        || !isActiveClientAvailable
                                        || chatSession.isSending
                                    }
                                    className='rounded-full bg-(--color-primary) p-3
                                        text-white transition disabled:cursor-not-allowed
                                        disabled:opacity-50'
                                >
                                    <ArrowUp className='h-4 w-4' />
                                </button>
                            </form>
                        </div>
                        <div className='p-2 w-full h-12'>
                            <div className='bg-(--color-bg-surface) rounded-lg w-full h-full flex gap-2 justify-center items-center'>
                                <div className='flex items-center gap-3 text-sm text-(--color-text-discreet)'>
                                    <span
                                        className={`h-2.5 w-2.5 rounded-full
                                            ${isConnected ? 'bg-emerald-500' : 'bg-red-500'}`}
                                    />
                                    {isConnected ? text.liveConnection : text.reconnecting}
                                </div>
                                <div className='w-px h-[70%] bg-(--color-bg-surface-raised)' />
                                <p className='text-sm text-(--color-text-discreet)'>
                                    {chatSession
                                        ? `${text.agent}: ${chatSession.clientName}`
                                        : isLoadingChat
                                            ? text.loadingConversation
                                            : text.notFound}
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

function getMessageClassName(message: GPT_ChatMessage) {
    if (message.role === 'user') {
        return 'ml-auto bg-(--color-primary) text-white'
    }

    if (message.role === 'system') {
        return `mx-auto w-full max-w-full border border-dashed shadow-none
            border-(--color-border-default) bg-(--color-bg-body)
            text-(--color-text-discreet)`
    }

    if (message.error) {
        return 'border border-red-200 bg-red-50 text-red-900 shadow-none'
    }

    return 'border border-(--color-border-default) bg-(--color-bg-surface) text-(--color-text-main)'
}
