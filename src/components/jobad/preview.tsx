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
                    <Link href='/career' className='group relative block p-[.5em_1.5em_.5em_1em] leading-[1.4em] text-[1.2rem] font-medium h-[2.4em] after:content-[""] after:absolute after:w-[0.6em] after:h-[0.6em] after:top-[0.85em] after:right-[0.5em] after:border-r-[0.18em] after:border-b-[0.18em] after:border-solid after:border-[var(--color-link-primary)] after:transform after:rotate-[-45deg] after:z-[5] after:transition-all'>
                        <span className='hidden 350px:block group-hover:text-[var(--color-link-primary)]'>
                            {text.jobadsPreview.seeAll}
                        </span>
                    </Link>
                </div>
                {loading && (
                    <ul className='grid grid-flow-col list-none overflow-auto p-[0_1rem_1rem_1rem] snap-x snap-mandatory 400px:gap-[1rem] 800px:grid-cols-2 800px:grid-flow-[inherit] 800px:p-[1rem_4vw_0_4vw] 800px:gap-[4vw] 1000px:grid-cols-3 1000px:gap-[1rem] 1000px:p-0'>
                        <li className='snap-center w-[80vw] max-w-[22rem] min-w-[18rem] 800px:w-full 800px:max-w-[28rem] 1000px:m-[0_auto]'>
                            <JobadCardSkeleton />
                        </li>
                        <li className='snap-center w-[80vw] max-w-[22rem] min-w-[18rem] 800px:w-full 800px:max-w-[28rem] 1000px:m-[0_auto]'>
                            <JobadCardSkeleton />
                        </li>
                        <li className='snap-center w-[80vw] max-w-[22rem] min-w-[18rem] 800px:w-full 800px:max-w-[28rem] 1000px:m-[0_auto]'>
                            <JobadCardSkeleton />
                        </li>
                        <EndCard path='/career' />
                    </ul>
                )}
                {!loading && jobads && jobads.length > 0 && (
                    <ul className='grid grid-flow-col list-none overflow-auto p-[0_1rem_1rem_1rem] snap-x snap-mandatory 400px:gap-[1rem] 800px:grid-cols-2 800px:grid-flow-[inherit] 800px:p-[1rem_4vw_0_4vw] 800px:gap-[4vw] 1000px:grid-cols-3 1000px:gap-[1rem] 1000px:p-0'>
                        {jobads.map((e) => (
                            <li key={e.id} className='snap-center w-[80vw] max-w-[22rem] min-w-[18rem] 800px:w-full 800px:max-w-[28rem] 1000px:m-[0_auto]'>
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
            <hr className='hidden 800px:block 800px:border-0 800px:h-[0.15rem] 800px:bg-[var(--color-border-default)] 800px:my-0 800px:mx-[2rem] 1000px:my-[2rem] 1000px:mx-auto 1000px:max-w-[calc(var(--w-page)-2rem)]' />
        </>
    )
}
