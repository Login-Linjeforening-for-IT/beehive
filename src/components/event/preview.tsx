import no from '@text/landing/no.json'
import en from '@text/landing/en.json'
import Link from 'next/link'
import EventListItem from '@components/event/EventItem'
import EndCard from '@components/shared/endCard'
import { getEvents } from '@utils/api'
import { cookies } from 'next/headers'

export default async function EventsPreview() {
    const events = await getEvents(null, 3, 0, true)
    const lang = (await cookies()).get('lang')?.value || 'no'
    const text = lang === 'no' ? no : en

    return (
        <>
            <section className='py-[2rem] 800px:py-[2rem] 800px:px-[1rem] 800px:mx-auto 1000px:w-full 1000px:max-w-[var(--w-page)]'>
                <div className='flex justify-between items-center px-[2rem]'>
                    <h2 className='py-[0.5rem] font-normal text-2xl'>
                        {text.eventsPreview.title}
                    </h2>
                    <Link href='events' className='group relative block p-[.5em_1.5em_.5em_1em] leading-[1.4em] text-[1.2rem] font-medium h-[2.4em] after:content-[""] after:absolute after:w-[0.6em] after:h-[0.6em] after:top-[0.85em] after:right-[0.5em] after:border-r-[0.18em] after:border-b-[0.18em] after:border-solid after:border-[var(--color-link-primary)] after:transform after:rotate-[-45deg] after:z-[5] after:transition-all'>
                        <span className='hidden 350px:block group-hover:text-[var(--color-link-primary)]'>
                            {text.jobadsPreview.seeAll}
                        </span>
                    </Link>
                </div>
                {Array.isArray(events) && events.length > 0 && (
                    <ul className='grid grid-flow-col list-none overflow-auto p-[0_1rem_1rem_1rem] snap-x snap-mandatory 400px:gap-[1rem] 800px:grid-cols-2 800px:grid-flow-row-dense 800px:p-[1rem_4vw_0_4vw] 800px:gap-[4vw] 1000px:grid-cols-3 1000px:gap-[1rem] 1000px:p-0'>
                        {/* eslint-disable-next-line */}
                        {events.map((e: any) => (
                            <li key={e.id} className='snap-center w-[80vw] max-w-[22rem] min-w-[18rem] 800px:w-full 800px:max-w-[28rem] 1000px:m-[0_auto]'>
                                <EventListItem event={e} variant='card' highlight={false} />
                            </li>
                        ))}
                        {events.length > 2 && <EndCard path='/events' />}
                    </ul>
                )}
            </section>
            <hr className='hidden 800px:block 800px:border-0 800px:h-[0.15rem] 800px:bg-[var(--color-border-default)] 800px:my-0 800px:mx-[2rem] 1000px:my-[2rem] 1000px:mx-auto 1000px:max-w-[calc(var(--w-page)-2rem)]' />
        </>
    )
}
