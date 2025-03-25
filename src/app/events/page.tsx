import EventListItem from '@components/event/EventItem'
// import Spinner from '@components/shared/spinner/spinner'
import GroupToggle from '@components/shared/grouptoggle/GroupToggle'
import prepFilter from '@components/shared/filter/prepFilter'
import no from '@text/eventList/no.json'
import en from '@text/eventList/en.json'
import GridView from '@components/svg/symbols/GridView'
// import ArrowDownWard from '@components/svg/symbols/ArrowDownWard'
import ListBulleted from '@components/svg/symbols/ListBulleted'
import { getEventCategoryFilters, getEvents } from '@utils/api'
import { cookies } from 'next/headers'
import FilterItem from '@components/shared/filter/filterItem'

type PageProps = { 
    searchParams: Promise<{ [key: string]: string | undefined }> 
}

export default async function Page({searchParams}: PageProps) {
    const filters = (await searchParams)
    
    const eventsView = filters.view ? `${filters.view}-view` : 'list-view'
    const filtersParams = typeof filters.categories === 'string' ? filters.categories : null
    
    const lang = (await cookies()).get('lang')?.value || 'no'
    const text = lang === 'no' ? no : en
    
    const limit = 20
    const temp_events = await getEvents(filtersParams, limit, 0)
    const events = (Array.isArray(temp_events) ? temp_events : []).filter((event: EventProps) => {
        const start = new Date(event.time_end).getTime()
        const now = new Date().getTime()
        return start - now > 0
    })
    const { currentWeekEvents, nextWeekEvents, futureEvents } = groupEvents(events)


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: { categories?: any[] } = {}

    const categoryFilters = await getCategoryFilters()
    // @ts-ignore
    if (categoryFilters) response['categories'] = categoryFilters
    

    return (
        <div className='page-container'>
            <div className='page-section--normal'>
                <h1 className='heading-1 heading-1--top-left-corner'>{text.title}</h1>
            </div>
            {(
                <>
                    <div className='flex justify-between items-center 400px:gap-[1rem] 400px:p-0 1000px:justify-end 1000px:p-[0_0_1rem_0] page-section--normal'>
                        {/* @ts-ignore */}
                        <div className='button-group justify-end 1000px:mr-[1.5rem]'>
                            <GroupToggle
                                options={[
                                    {
                                        leadingIcon: (
                                            <GridView className='w-[1.5rem] fill-white' />
                                        ),
                                        name: 'grid'
                                    },
                                    {
                                        leadingIcon: (<ListBulleted className='w-[1.5rem] fill-white' />),
                                        name: 'list'
                                    },
                                ]}
                                // activeVariant='primary-outlined'
                                // inactiveVariant='secondary-outlined'
                                groupVariant='ghost'
                                buttonVariant='ghost'
                                size='medium'
                            />
                        </div>
                    </div>
                    <div className='page-section--without-gaps'>
                        <div className='p-[0_0.5rem] 400px:p-[0_1rem] 800px:p-[0_2rem] 1000px:grid 1000px:grid-cols-[17rem_auto] 1000px:gap-[3vw]'>
                            <div className='1000px:order-1'>
                                <FilterItem filterData={response} />
                            </div>
                            <div className='1000px:order-2'>
                                <ul
                                    className={`list-none pt-[1rem] 1000px:pt-0 events_list${
                                        eventsView === 'grid-view' ? '--grid-view grid grid-cols-1 gap-[1rem] 600px:grid-cols-2 800px:gap-[2rem]' : '--list-view'
                                    }`}
                                >

                                    {currentWeekEvents?.length > 0 && (
                                        <>
                                            {eventsView == 'list-view' && (
                                                <div className='relative m-[1.2rem_0.5rem_0.2rem_0.5rem] before:content-[""] before:absolute before:top-[50%] before:w-full before:h-[0.13rem] before:bg-[var(--color-border-default)] 600px:mr-[1rem] 600px:ml-[1rem] mt-[0.2rem]'>
                                                    <p className='bg-[var(--color-bg-body)] text-[var(--color-text-discreet)] font-medium text-[0.9rem] tracking-[0.15em] w-fit p-[0_1rem] m-[0_auto] z-2 block relative'>
                                                        {text.thisWeek}
                                                    </p>
                                                </div>
                                            )}
                                            {currentWeekEvents.map((e, idx) => (
                                                <li key={idx}>
                                                    <EventListItem
                                                        key={e.id}
                                                        event={e}
                                                        highlight={e.highlight}
                                                        variant={
                                                            eventsView === 'grid-view'
                                                                ? 'card'
                                                                : 'list-item'
                                                        }
                                                    />
                                                </li>
                                            ))}
                                        </>
                                    )
                                    }

                                    {nextWeekEvents?.length > 0 && (
                                        <>
                                            {eventsView == 'list-view' && (
                                                <div className='relative m-[1.2rem_0.5rem_0.2rem_0.5rem] before:content-[""] before:absolute before:top-[50%] before:w-full before:h-[0.13rem] before:bg-[var(--color-border-default)] 600px:mr-[1rem] 600px:ml-[1rem]'>
                                                    <p className='bg-[var(--color-bg-body)] text-[var(--color-text-discreet)] font-medium text-[0.9rem] tracking-[0.15em] w-fit p-[0_1rem] m-[0_auto] z-2 block relative'>
                                                        {text.nextWeek}
                                                    </p>
                                                </div>
                                            )}
                                            {nextWeekEvents.map((e, idx) => (
                                                <li key={idx}>
                                                    <EventListItem
                                                        key={e.id}
                                                        event={e}
                                                        highlight={e.highlight}
                                                        variant={
                                                            eventsView === 'grid-view'
                                                                ? 'card'
                                                                : 'list-item'
                                                        }
                                                    />
                                                </li>
                                            ))}
                                        </>
                                    )
                                    }

                                    {futureEvents?.length > 0 && (
                                        <>
                                            {eventsView == 'list-view' && currentWeekEvents?.length + nextWeekEvents?.length > 0 && (
                                                <div className='relative m-[1.2rem_0.5rem_0.2rem_0.5rem] before:content-[""] before:absolute before:top-[50%] before:w-full before:h-[0.13rem] before:bg-[var(--color-border-default)] 600px:mr-[1rem] 600px:ml-[1rem]'>
                                                    <p className='bg-[var(--color-bg-body)] text-[var(--color-text-discreet)] font-medium text-[0.9rem] tracking-[0.15em] w-fit p-[0_1rem] m-[0_auto] z-2 block relative'>
                                                        {text.later}
                                                    </p>
                                                </div>
                                            )}
                                            {futureEvents.map((e, idx) => (
                                                <li key={idx}>
                                                    <EventListItem
                                                        key={e.id}
                                                        event={e}
                                                        highlight={e.highlight}
                                                        variant={
                                                            eventsView === 'grid-view'
                                                                ? 'card'
                                                                : 'list-item'
                                                        }
                                                    />
                                                </li>
                                            ))}
                                        </>
                                    )
                                    }
                                </ul>

                                {events.length > 0 && (
                                    <div className='events_load-more'>
                                        {/* @ts-ignore */}
                                        {/* <Button
                                            href=''
                                            onClick={loadItems}
                                            variant='secondary'
                                            className='m-[2rem_0]'
                                            trailingIcon={<ArrowDownWard className=''/>}
                                        >
                                            {text.loadMore}
                                        </Button> */}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

function getLabelKeyWithLang(key: string) {
    // eslint-disable-next-line
    return (v: any) => {
        const vNo = v[key + '_no']
        const vEn = v[key + '_en'] || vNo

        return {
            no: vNo,
            en: vEn,
        }
    }
}

 
async function getCategoryFilters() {
    try {
        const categoryFilterData = await getEventCategoryFilters()
        if (typeof categoryFilterData === 'string') {
            throw new Error(categoryFilterData)
        }

        const title = {
            en: 'Categories',
            no: 'Kategorier',
        }

        return prepFilter(
            categoryFilterData,
            'categories',
            title,
            'id',
            getLabelKeyWithLang('name'),
            'count',
            'check',
            true
        )
    } catch (error) {
        console.error(`Error fetching category filters: ${error}`)
        return null
    }
}

function groupEvents(eventsArray: EventProps[]) {
    // Get the current date
    const currentDate = new Date()

    // Calculate the start of the current week (Monday)
    const startOfWeek = new Date(currentDate)
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1)
    startOfWeek.setHours(0)
    startOfWeek.setMinutes(0)
    startOfWeek.setSeconds(0)

    // Calculate the start of the next week
    const startOfNextWeek = new Date(startOfWeek)
    startOfNextWeek.setDate(startOfWeek.getDate() + 7)

    // Calculate the start of the week after next week
    const startOfWeekAfterNextWeek = new Date(startOfWeek)
    startOfWeekAfterNextWeek.setDate(startOfWeek.getDate() + 14)

    // group the dates
    const currentWeekEvents: EventProps[] = []
    const nextWeekEvents: EventProps[] = []
    const futureEvents: EventProps[] = []

    eventsArray.forEach((event) => {
        const eventDate = new Date(event.time_start)

        if (eventDate >= startOfWeek && eventDate < startOfNextWeek) {
            currentWeekEvents.push(event)
        } else if (
            eventDate >= startOfNextWeek &&
            eventDate < startOfWeekAfterNextWeek
        ) {
            nextWeekEvents.push(event)
        } else {
            futureEvents.push(event)
        }
    })

    return {
        currentWeekEvents,
        nextWeekEvents,
        futureEvents,
    }
}
