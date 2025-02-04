'use client'

import { useState, useEffect, useRef, useContext } from 'react'
import EventListItem from '@components/event/EventItem'
import Spinner from '@components/shared/spinner/spinner'
import FilterGroup from '@components/shared/filter/filter'
import Button from '@components/shared/button/Button'
import GroupToggle from '@components/shared/grouptoggle/GroupToggle'
import Alert from '@components/shared/alert/Alert'
import prepFilter from '@components/shared/filter/prepFilter'
import { getEventCategoryFilters, getEvents } from '@utils/api'
import debounce from '@/utils/debounce'
import no from '@text/eventList/no.json'
import en from '@text/eventList/en.json'
import './page.css'
import AppContext from '@context/context'
import GridView from '@components/svg/symbols/GridView'
import List from '@components/svg/symbols/List'
import ArrowDownWard from '@components/svg/symbols/ArrowDownWard'
import ListBulleted from '@components/svg/symbols/ListBulleted'

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
        const [categoryFilterData, err] = await getEventCategoryFilters()
        if (err) {
            throw new Error(err)
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
        console.error('Error fetching category filters:', error)
        return null
    }
}

// eslint-disable-next-line
function groupEvents(eventsArray: any[]) {
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
    // eslint-disable-next-line
    const currentWeekEvents: any[] = []
    // eslint-disable-next-line
    const nextWeekEvents: any[] = []
    // eslint-disable-next-line
    const futureEvents: any[] = []

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

export default function Events() {
    // if (typeof localStorage === 'undefined') {
    //     return null
    // }
    
    const { lang } = useContext(AppContext)
    const text = lang === 'en' ? en : no
    // eslint-disable-next-line
    const [events, setEvents] = useState<any[]>([])
    const [filterData, setFilterData] = useState({})
    const [showLoadMore, setShowLoadMore] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    // eslint-disable-next-line
    const filters = useRef<any>({})
    const limit = 20
    const offset = useRef(0)
    const [groupedEvents, setGroupedEvents] = useState({
        // eslint-disable-next-line
        currentWeekEvents: [] as any[],
        // eslint-disable-next-line
        nextWeekEvents: [] as any[],
        // eslint-disable-next-line
        futureEvents: [] as any[],
    })
    // const [eventsView, setEventsView] = useState(() => {
    //     return localStorage.getItem('events-view') || 'list-view'
    // })

    const eventsView = 'list-view'

    function toggleFilter() {
        setIsFilterOpen((prevState) => !prevState)
    }

    useEffect(() => {
        localStorage.setItem('events-view', eventsView)
    }, [eventsView])

    const [viewToggleIndex, setViewToggleIndex] = useState(
        // @ts-expect-error
        eventsView == 'grid-view' ? 0 : 1
    )
    function handleOptionChange(index: number) {
        setViewToggleIndex(index)
        // setEventsView(index == 0 ? 'grid-view' : 'list-view')
    }

    // eslint-disable-next-line
    const ap = debounce(async (v: any) => {
        filters.current = v

        try {
            const [response, err] = await getEvents(v.categories, limit, 0)
            if (err) {
                throw new Error(err)
            }

            setShowLoadMore(response.length === limit)
            offset.current = limit
            setEvents(response)
            setGroupedEvents(groupEvents(response))
        } catch (error) {
            console.error('Error fetching filtered events:', error)
            setError('Failed to load events based on filters.')
        } finally {
            setLoading(false)
        }
    }, 50)

    async function loadItems() {
        try {
            const [response, err] = await getEvents(
                filters.current.categories,
                limit,
                offset.current
            )
            if (err) {
                throw new Error(err)
            }

            console.log(response)
            offset.current = events.length + response.length
            setEvents((prevItems) => [...prevItems, ...response])

            const categorizedResponse = groupEvents(response)
            setGroupedEvents((prevOrder) => ({
                currentWeekEvents: [
                    ...prevOrder.currentWeekEvents,
                    ...categorizedResponse.currentWeekEvents,
                ],
                nextWeekEvents: [
                    ...prevOrder.nextWeekEvents,
                    ...categorizedResponse.nextWeekEvents,
                ],
                futureEvents: [
                    ...prevOrder.futureEvents,
                    ...categorizedResponse.futureEvents,
                ],
            }))

            setShowLoadMore(response.length === limit)
        } catch (error) {
            console.error('Error loading events:', error)
            setError('Failed to load events.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        (async () => {
            try {
                // eslint-disable-next-line
                const d: any = {}
                const categoryFilters = await getCategoryFilters()
                if (categoryFilters) d['categories'] = categoryFilters
                setFilterData(d)
                await loadItems()
            } catch {
                setError('Failed to initialize event data.')
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    return (
        <div className='page-container'>
            <div className='page-section--normal'>
                <h1 className='heading-1 heading-1--top-left-corner'>{text.title}</h1>
            </div>
            {loading && <Spinner width={50} height={50} />}
            {!loading && error && (
                <Alert
                    variant='danger'
                    className='page-section--normal page-section--alert'
                >
                    {error}
                </Alert>
            )}
            {!loading && !error && (
                <>
                    <div className='events-top-bar page-section--normal'>
                        {/* @ts-ignore */}
                        <Button
                            href=''
                            variant='secondary-outlined'
                            trailingIcon={<List className=''/>}
                            onClick={toggleFilter}
                            size='medium'
                            className={`events-topbar_filter-toggle ${
                                isFilterOpen ? 'active' : ''
                            }`}
                        >
                            Filter
                        </Button>
                        <div className='button-group events-top-bar_view-toggle'>
                            <GroupToggle
                                options={[
                                    {
                                        leadingIcon: (
                                            <GridView className='' />
                                        ),
                                    },
                                    {
                                        leadingIcon: (<ListBulleted className='' />),
                                    },
                                ]}
                                // @ts-expect-error
                                activeVariant='primary-outlined'
                                inactiveVariant='secondary-outlined'
                                onOptionChange={handleOptionChange}
                                activeOptionIndex={viewToggleIndex}
                                groupVariant='ghost'
                                buttonVariant='ghost'
                                size='medium'
                            />
                        </div>
                    </div>
                    <div className='page-section--without-gaps'>
                        <div className='events'>
                            <div className='events_section--left'>
                                <div
                                    className={`events_filter-container ${
                                        isFilterOpen ? 'events_filter-container--open' : ''
                                    }`}
                                >
                                    {filterData ? (
                                        <FilterGroup
                                            filters={filterData}
                                            onApply={ap}
                                            close={toggleFilter}
                                        />
                                    ) : (
                                        'no filter data'
                                    )}
                                </div>
                            </div>
                            <div className='events_section--right'>
                                <ul
                                    className={`events_list events_list${
                                        // @ts-expect-error
                                        eventsView === 'grid-view' ? '--grid-view' : '--list-view'
                                    }`}
                                >
                                    {groupedEvents.currentWeekEvents &&
                    groupedEvents.currentWeekEvents.length > 0 && (
                                        <>
                                            <div className='event-list-separator event-list-seperator--first'>
                                                <p className='event-list-separator_text'>
                                                    {text.thisWeek}
                                                </p>
                                            </div>
                                            {groupedEvents.currentWeekEvents.map((e, idx) => (
                                                <li key={idx}>
                                                    <EventListItem
                                                        key={e.id}
                                                        event={e}
                                                        highlight={e.highlight}
                                                        variant={
                                                            // @ts-expect-error
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

                                    {groupedEvents.nextWeekEvents &&
                    groupedEvents.nextWeekEvents.length > 0 && (
                                        <>
                                            <div className='event-list-separator'>
                                                <p className='event-list-separator_text'>
                                                    {text.nextWeek}
                                                </p>
                                            </div>
                                            {groupedEvents.nextWeekEvents.map((e, idx) => (
                                                <li key={idx}>
                                                    <EventListItem
                                                        key={e.id}
                                                        event={e}
                                                        highlight={e.highlight}
                                                        variant={
                                                            // @ts-expect-error
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

                                    {groupedEvents.futureEvents &&
                    groupedEvents.futureEvents.length > 0 && (
                                        <>
                                            {groupedEvents.currentWeekEvents.length +
                          groupedEvents.nextWeekEvents.length >
                          0 && (
                                                <div className='event-list-separator'>
                                                    <p className='event-list-separator_text'>
                                                        {text.later}
                                                    </p>
                                                </div>
                                            )}
                                            {groupedEvents.futureEvents.map((e, idx) => (
                                                <li key={idx}>
                                                    <EventListItem
                                                        key={e.id}
                                                        event={e}
                                                        highlight={e.highlight}
                                                        variant={
                                                            // @ts-expect-error
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

                                {!loading && showLoadMore && events.length > 0 && (
                                    <div className='events_load-more'>
                                        {/* @ts-ignore */}
                                        <Button
                                            href=''
                                            onClick={loadItems}
                                            variant='secondary'
                                            className='events_load-more-btn'
                                            trailingIcon={<ArrowDownWard className=''/>}
                                        >
                                            {text.loadMore}
                                        </Button>
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
