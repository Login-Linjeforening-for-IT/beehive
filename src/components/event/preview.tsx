'use client'

import AppContext from '@context/context'
import { getEvents } from '@utils/api'
import { useContext, useEffect, useState } from 'react'
import no from '@text/landing/no.json'
import en from '@text/landing/en.json'
import EventCardSkeleton from './EventCardSkeleton'
import Link from 'next/link'
import Alert from '@components/shared/alert/Alert'
import EventListItem from '@components/event/EventItem'
import EndCard from '@components/shared/endCard'

export default function EventsPreview() {
    // eslint-disable-next-line
    const [events, setEvents] = useState<any[] | null>(null)
    const [loading, setLoading] = useState(true)
    // eslint-disable-next-line
    const [error, setError] = useState<any | null>(null)
    const { lang } = useContext(AppContext)
    const text = lang === 'en' ? en : no

    useEffect(() => {
        (async () => {
            try {
                const [eventsData, err] = await getEvents(null, 3, 0, true)
                if (err) {
                    setError(err)
                    console.error(err)
                } else {
                    setEvents(eventsData)
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
                        {text.eventsPreview.title}
                    </h2>
                    <Link href='/events' className='relative block py-[0.5rem] pr-[1.5em] pl-[1rem] leading-[1.4rem] font-medium h-[2.4em]'>
                        <span className='dynamic-preview-heading_link-text'>
                            {text.jobadsPreview.seeAll}
                        </span>
                    </Link>
                </div>
                {loading && (
                    <ul className='dynamic-preview-list'>
                        <li className='dynamic-preview-list_item'>
                            <EventCardSkeleton />
                        </li>
                        <li className='dynamic-preview-list_item'>
                            <EventCardSkeleton />
                        </li>
                        <li className='dynamic-preview-list_item'>
                            <EventCardSkeleton />
                        </li>
                        <EndCard path='/career' />
                    </ul>
                )}
                {!loading && events && events.length > 0 && (
                    <ul className='dynamic-preview-list'>
                        {/* eslint-disable-next-line */}
                        {events.map((e: any) => (
                            <li key={e.id} className='dynamic-preview-list_item'>
                                <EventListItem event={e} variant='card' highlight={false} />
                            </li>
                        ))}
                        {events.length > 2 && <EndCard path='/events' />}
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
