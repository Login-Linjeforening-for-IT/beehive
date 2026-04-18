'use client'

import en from '@text/ai/en.json'
import no from '@text/ai/no.json'
import { ArrowUp, Bot, MessageSquarePlus, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import useGptPageState from '@components/gpt/useGptPageState'
import findHighestTPSClient from '@utils/findHighestTPSClient'

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
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    const messagesEndRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        void restoreChat(id)
    }, [id, restoreChat])

    useEffect(() => {
        const textarea = textareaRef.current
        if (!textarea) {
            return
        }

        textarea.style.height = '0px'
        textarea.style.height = `${Math.min(textarea.scrollHeight, 240)}px`
    }, [input])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [chatSession?.messages])

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

        if (!chatSession || !input.trim()) {
            return
        }

        if (!isActiveClientAvailable) {
            return
        }

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
            await switchConversationClient(chatSession.conversationId, selectedClient)
        } finally {
            setIsSwitching(false)
        }
    }

    return (
        <div className='page-container min-h-[calc(100vh-var(--h-topbar))]'>
            <div className='page-section--normal h-[calc(100vh-var(--h-topbar)-2rem)] py-6'>
                <div className='grid h-full gap-4 lg:grid-cols-[minmax(260px,20%)_minmax(0,80%)]'>
                    <aside
                        className='flex h-full min-h-0 flex-col rounded-4xl border
                            border-(--color-border-default) bg-(--color-bg-surface) p-4'
                    >
                        <Link
                            href='/ai'
                            className='flex items-center justify-center gap-2 rounded-2xl border border-(--color-border-default)
                                bg-(--color-bg-body) px-4 py-3 text-sm font-semibold text-(--color-text-main) transition hover:opacity-85'
                        >
                            <MessageSquarePlus className='h-4 w-4' />
                            {text.newChat}
                        </Link>

                        <div className='mt-5 flex items-center justify-between'>
                            <h2 className='text-xs font-semibold uppercase tracking-[0.18em] text-(--color-text-discreet)'>
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
                                        className={`w-full rounded-2xl border p-3 text-left transition
                                            ${isActive
                                        ? 'border-(--color-primary) bg-(--color-bg-body)'
                                        : 'border-(--color-border-default) bg-transparent hover:bg-(--color-bg-body)'}`}
                                    >
                                        <div className='flex items-start justify-between gap-3'>
                                            <p className='line-clamp-2 text-sm font-semibold text-(--color-text-main)'>
                                                {conversation.title}
                                            </p>
                                            <Sparkles className='mt-0.5 h-4 w-4 shrink-0 text-(--color-primary)' />
                                        </div>
                                        <p className='mt-2 text-xs text-(--color-text-discreet)'>
                                            {conversation.activeClientName}
                                        </p>
                                        <p className='mt-2 line-clamp-2 text-xs text-(--color-text-discreet)'>
                                            {conversation.lastMessagePreview || text.noMessages}
                                        </p>
                                    </button>
                                )
                            })}
                        </div>
                    </aside>

                    <section
                        className='flex h-full min-h-0 flex-col rounded-4xl border
                            border-(--color-border-default) bg-(--color-bg-surface)'
                    >
                        <header
                            className='flex flex-col gap-4 border-b border-(--color-border-default)
                                px-6 py-5 lg:flex-row lg:items-center lg:justify-between'
                        >
                            <div>
                                <h1 className='text-2xl font-semibold text-(--color-text-main)'>
                                    {chatSession?.title || text.titleFallback}
                                </h1>
                                <p className='mt-1 text-sm text-(--color-text-discreet)'>
                                    {chatSession
                                        ? `${text.agent}: ${chatSession.clientName}`
                                        : isLoadingChat
                                            ? text.loadingConversation
                                            : text.notFound}
                                </p>
                            </div>

                            <div className='flex items-center gap-3 text-sm text-(--color-text-discreet)'>
                                <span
                                    className={`h-2.5 w-2.5 rounded-full
                                        ${isConnected ? 'bg-emerald-500' : 'bg-red-500'}`}
                                />
                                {isConnected ? text.liveConnection : text.reconnecting}
                            </div>
                        </header>

                        {!isActiveClientAvailable && chatSession ? (
                            <div className='border-b border-(--color-border-default) bg-amber-50/50 px-6 py-4'>
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
                                            className='rounded-xl border border-amber-300 bg-white
                                                px-3 py-2 text-sm text-slate-900 outline-none'
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
                                            className='rounded-xl bg-amber-500 px-4 py-2 text-sm
                                                font-semibold text-white disabled:cursor-not-allowed
                                                disabled:opacity-60'
                                        >
                                            {isSwitching ? text.switching : text.continueOnAnotherModel}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : null}

                        <div className='flex-1 overflow-y-auto px-4 py-5 lg:px-6'>
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
                                <div className='mx-auto flex max-w-4xl flex-col gap-4'>
                                    {chatSession.messages.map((message) => (
                                        <article
                                            key={message.id}
                                            className={`max-w-[92%] rounded-[1.75rem] px-4 py-3 shadow-sm
                                                ${message.role === 'user'
                                            ? 'ml-auto bg-(--color-primary) text-white'
                                            : message.role === 'system'
                                                ? `mx-auto w-full max-w-full border border-dashed
                                                            border-(--color-border-default)
                                                            bg-(--color-bg-body)
                                                            text-(--color-text-discreet)`
                                                : message.error
                                                    ? 'border border-red-200 bg-red-50 text-red-900'
                                                    : 'bg-(--color-bg-body) text-(--color-text-main)'}`}
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
                                                    prose-pre:rounded-2xl prose-pre:bg-black/80
                                                    prose-pre:p-4'
                                            >
                                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                    {message.content || '...'}
                                                </ReactMarkdown>
                                            </div>
                                        </article>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>
                            )}
                        </div>

                        <div className='border-t border-(--color-border-default) px-4 py-4 lg:px-6'>
                            <form
                                onSubmit={handleSubmit}
                                className='mx-auto flex max-w-4xl items-end gap-3 rounded-[1.75rem]
                                    border border-(--color-border-default) bg-(--color-bg-body) p-3'
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
                                    className='min-h-7 w-full resize-none overflow-y-auto
                                        bg-transparent outline-none'
                                />
                                <button
                                    type='submit'
                                    disabled={
                                        !input.trim()
                                        || !chatSession
                                        || !isActiveClientAvailable
                                        || chatSession.isSending
                                    }
                                    className='rounded-full bg-(--color-primary) p-3 text-white
                                        transition disabled:cursor-not-allowed disabled:opacity-50'
                                >
                                    <ArrowUp className='h-4 w-4' />
                                </button>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
