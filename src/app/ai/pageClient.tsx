'use client'

import GPT_EmptyState from '@components/gpt/emptyState'
import GPTPreview from '@components/gpt/gptPreview'
import useGptPageState from '@components/gpt/useGptPageState'
import { Comic_Neue } from 'next/font/google'

const comicNeue = Comic_Neue({ subsets: ['latin'], weight: ['400', '700'] })

export default function page() {
    const gpt = useGptPageState()

    // console.log(gpt)
    // {gpt.clients.length ? <GPT_Content clients={gpt.clients} onTestClient={gpt.openChat} /> : <GPT_EmptyState />}
    return (
        <div className='page-container min-h-[calc(100vh-var(--h-topbar))]'>
            <div className='page-section--normal flex flex-col'>
                <h1 className='heading-1 heading-1--top-left-corner'>
                    Login AI
                </h1>
                <h1 className={`${comicNeue.className} text-right text-lg pr-18 -mt-25 text-(--color-primary)`}>#GjermundAI</h1>
                {gpt.clients.length ? <GPTPreview gpt={gpt}  /> : <GPT_EmptyState />}
            </div>
        </div>
    )
}
