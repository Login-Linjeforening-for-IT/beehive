
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import text_no from '@text/status/no.json'
import text_en from '@text/status/en.json'
import useLang from '@/hooks/useLang'

type StatusData = Status['prod'] | Status['dev']

export default function PageClient({ status }: { status: Status }) {
    const router = useRouter()
    const text = useLang(text_no, text_en)

    useEffect(() => {
        const interval = setInterval(() => {
            router.refresh()
        }, 60000)

        return () => clearInterval(interval)
    }, [router])

    return (
        <div className='page-container min-h-[calc(100vh-var(--h-topbar))]'>
            <div className='page-section--normal flex flex-col gap-8'>
                <h1 className='heading-1 heading-1--top-left-corner'>
                    {text.title}
                </h1>

                <div className='grid gap-8 md:grid-cols-2'>
                    <StatusSection title={text.production} data={status.prod} text={text} />
                    <StatusSection title={text.development} data={status.dev} text={text} />
                </div>
            </div>
        </div>
    )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function StatusSection({ title, data, text }: { title: string, data: StatusData, text: any }) {
    return (
        <div className='rounded-xl border border-(--color-border-default) bg-(--color-bg-surface) p-6 shadow-sm'>
            <div className='mb-6 flex items-center justify-between'>
                <h2 className='heading-2 mb-0!'>{title}</h2>
                <StatusPill status={data.status.message as ServiceStatusHuman} text={text} />
            </div>

            {'info' in data.status && (
                <div className='mb-4 rounded-md bg-(--color-alert-info-bg) p-3 text-sm text-(--color-alert-info-text)'>
                    {data.status.info}
                </div>
            )}

            {'error' in data.status && (
                <div className='mb-4 rounded-md bg-(--color-alert-danger-bg) p-3 text-sm text-(--color-alert-danger-text)'>
                    {data.status.error}
                </div>
            )}

            <div className='space-y-3'>
                {data.services && data.services.length > 0 ? (
                    data.services.map((service) => {
                        return (
                            <div key={service.name} className='flex flex-col rounded-lg bg-(--color-bg-surface-raised)/40 p-3'>
                                <div className='flex items-center justify-between'>
                                    <span className='font-medium text-(--color-text-main)'>{service.name}</span>
                                    <StatusPill status={service.status} small text={text} />
                                </div>
                                {'issues' in service && service.issues && (
                                    <div className='mt-2'>
                                        {service.issues.map((issue, index) => (
                                            <div key={index} className='text-sm text-(--color-text-discreet)'>
                                                {(
                                                    (text.issues as Record<string, string>)[issue] || (text.issues as Record<string, string>)['unknown']
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )
                    })
                ) : (
                    <p className='py-4 text-center italic text-(--color-text-discreet)'>{text.noServices}</p>
                )}
            </div>
        </div>
    )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function StatusPill({ status, small, text }: { status: ServiceStatusHuman, small?: boolean, text: any }) {
    let colorClass = 'bg-(--color-bg-surface) text-(--color-text-regular)'

    if (status === 'operational') {
        colorClass = 'bg-(--color-tag-success-bg) text-(--color-tag-success-text)'
    } else if (status === 'degraded' || status === 'inactive') {
        colorClass = 'bg-(--color-alert-warning-bg) text-(--color-alert-warning-text)'
    } else if (status === 'down') {
        colorClass = 'bg-(--color-tag-danger-bg) text-(--color-tag-danger-text)'
    }

    return (
        <span className={`
            inline-flex items-center justify-center rounded-full font-medium ${small ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm'}
            ${colorClass}
        `}>
            {(text?.statuses && (text.statuses as Record<string, string>)[status as string]) || status}
        </span>
    )
}
