import { Bot } from 'lucide-react'

export default function GPT_EmptyState() {
    return (
        <div className='w-full rounded-2xl mt-45 border border-grey-50/10 bg-grey-900/50 px-6 py-10 text-center'>
            <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-grey-50/5'>
                <Bot className='h-6 w-6 stroke stroke-primary-500' />
            </div>
            <h2 className='mt-4 font-semibold text-login-50'>No GPTs connected</h2>
            <p className='mt-2 text-sm text-login-100'>This page will automatically update when a model becomes available.</p>
            <p className='mt-2 text-xs text-login-200'>Contact TekKom if the issue persists.</p>
        </div>
    )
}
