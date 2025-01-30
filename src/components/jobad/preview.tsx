'use client'

import AppContext from '@context/context'
import { getJobs } from '@utils/api'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import JobadCardSkeleton from './JobadCardSkeleton'
import Alert from '@components/shared/alert/Alert'
import no from '@text/landing/no.json'
import en from '@text/landing/en.json'
import EndCard from '@components/shared/endCard'
import JobadCard from './JobadCard'

export default function JobadsPreview() {
    // eslint-disable-next-line
    const [jobads, setJobads] = useState<any[] | null>(null)
    const [loading, setLoading] = useState(true)
    // eslint-disable-next-line
    const [error, setError] = useState<any | null>(null)
    const { lang } = useContext(AppContext)
    const text = lang === 'en' ? en : no

    useEffect(() => {
        (async () => {
            try {
                const [jobadsData, err] = await getJobs(null, null, null, null, 3, 0)
                if (err) {
                    setError(err)
                    console.error(err)
                } else {
                    setJobads(jobadsData)
                }
            } catch (error) {
                setError('Unexpected error occurred')
                console.error('Unexpected error:', error)
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    return (
        <>
            <section className='py-[2rem] 800px:py-[2rem] 800px:px-[1rem] 800px:mx-auto 1000px:w-full 1000px:max-w-[var(--w-page)]'>
                <div className='flex justify-between items-center px-[2rem]'>
                    <h2 className='py-[0.5rem] font-normal text-2xl'>
                        {text.jobadsPreview.title}
                    </h2>
                    <Link href='/career' className='relative block py-[0.5rem] pr-[1.5em] pl-[1rem] leading-[1.4rem] font-medium h-[2.4em]'>
                        <span className='dynamic-preview-heading_link-text'>
                            {text.jobadsPreview.seeAll}
                        </span>
                    </Link>
                </div>
                {loading && (
                    <ul className='dynamic-preview-list'>
                        <li className='dynamic-preview-list_item'>
                            <JobadCardSkeleton />
                        </li>
                        <li className='dynamic-preview-list_item'>
                            <JobadCardSkeleton />
                        </li>
                        <li className='dynamic-preview-list_item'>
                            <JobadCardSkeleton />
                        </li>
                        <EndCard path='/career' />
                    </ul>
                )}
                {!loading && jobads && jobads.length > 0 && (
                    <ul className='dynamic-preview-list'>
                        {jobads.map((e) => (
                            <li key={e.id} className='dynamic-preview-list_item'>
                                <JobadCard jobad={e} />
                            </li>
                        ))}
                        {jobads.length > 2 && <EndCard path='/career' />}
                    </ul>
                )}
                {error && !loading && (
                    <Alert
                        variant='danger'
                        className='page-section--alert'
                    >
                        Error fetching events: {error.message || error}
                    </Alert>
                )}
            </section>
            <hr className='dynamic-preview-seperator' />
        </>
    )
}
