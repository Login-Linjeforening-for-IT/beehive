import EventListItem from '@components/event/EventItem'
// import Spinner from '@components/shared/spinner/spinner'
// import FilterGroup from '@components/shared/filter/filter'
// import Button from '@components/shared/button/Button'
// import GroupToggle from '@components/shared/grouptoggle/GroupToggle'
import Alert from '@components/shared/alert/Alert'
import prepFilter from '@components/shared/filter/prepFilter'
// import debounce from '@/utils/debounce'
import no from '@text/eventList/no.json'
import en from '@text/eventList/en.json'
// import GridView from '@components/svg/symbols/GridView'
// import List from '@components/svg/symbols/List'
// import ArrowDownWard from '@components/svg/symbols/ArrowDownWard'
// import ListBulleted from '@components/svg/symbols/ListBulleted'
import { getEventCategoryFilters, getEvents } from '@utils/api'
import { cookies } from 'next/headers'
import './page.css'

export default async function Events() {
    const lang = (await cookies()).get('lang')?.value || 'no'
    const text = lang === 'no' ? no : en
    const limit = 20
    const temp_events = await getEvents([], limit, 0)
    const events = (Array.isArray(temp_events) ? temp_events : []).filter((event: EventProps) => {
        const start = new Date(event.time_start).getTime()
        const now = new Date().getTime()
        return start - now > 0
    })
    // const [events, setEvents] = useState<any[]>([])
    // const [filterData, setFilterData] = useState({})
    // const [showLoadMore, setShowLoadMore] = useState(false)
    // const [loading, setLoading] = useState(true)
    // const [error, setError] = useState<string | null>(null)
    // const [isFilterOpen, setIsFilterOpen] = useState(false)
    // const filters = useRef<any>({})
    // const offset = useRef(0)
    // const [groupedEvents, setGroupedEvents] = useState({
    //     currentWeekEvents: [] as any[],
    //     nextWeekEvents: [] as any[],
    //     futureEvents: [] as any[],
    // })
    // const [eventsView, setEventsView] = useState(() => {
    //     return localStorage.getItem('events-view') || 'list-view'
    // })

    const eventsView = 'list-view'

    // function toggleFilter() {
    //     setIsFilterOpen((prevState) => !prevState)
    // }

    // useEffect(() => {
    //     localStorage.setItem('events-view', eventsView)
    // }, [eventsView])

    // const [viewToggleIndex, setViewToggleIndex] = useState(
    //     // @ts-expect-error
    //     eventsView == 'grid-view' ? 0 : 1
    // )
    // function handleOptionChange(index: number) {
    //     setViewToggleIndex(index)
    //     // setEventsView(index == 0 ? 'grid-view' : 'list-view')
    // }

    // const ap = debounce(async (v: any) => {
    //     filters.current = v

    //     try {
    //         const [response, err] = await getEvents(v.categories, limit, 0)
    //         if (err) {
    //             throw new Error(err)
    //         }

    //         setShowLoadMore(response.length === limit)
    //         offset.current = limit
    //         setEvents(response)
    //         setGroupedEvents(groupEvents(response))
    //     } catch (error) {
    //         console.error('Error fetching filtered events:', error)
    //         setError('Failed to load events based on filters.')
    //     } finally {
    //         setLoading(false)
    //     }
    // }, 50)

    // async function loadItems() {
    //     try {
    //         const [response, err] = await getEvents(
    //             filters.current.categories,
    //             limit,
    //             offset.current
    //         )
    //         if (err) {
    //             throw new Error(err)
    //         }

    //         console.log(response)
    //         offset.current = events.length + response.length
    //         setEvents((prevItems) => [...prevItems, ...response])

    //         const categorizedResponse = groupEvents(response)
    //         setGroupedEvents((prevOrder) => ({
    //             currentWeekEvents: [
    //                 ...prevOrder.currentWeekEvents,
    //                 ...categorizedResponse.currentWeekEvents,
    //             ],
    //             nextWeekEvents: [
    //                 ...prevOrder.nextWeekEvents,
    //                 ...categorizedResponse.nextWeekEvents,
    //             ],
    //             futureEvents: [
    //                 ...prevOrder.futureEvents,
    //                 ...categorizedResponse.futureEvents,
    //             ],
    //         }))

    //         setShowLoadMore(response.length === limit)
    //     } catch (error) {
    //         console.error('Error loading events:', error)
    //         setError('Failed to load events.')
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             // eslint-disable-next-line
    //             const d: any = {}
    //             const categoryFilters = await getCategoryFilters()
    //             if (categoryFilters) d['categories'] = categoryFilters
    //             setFilterData(d)
    //             await loadItems()
    //         } catch {
    //             setError('Failed to initialize event data.')
    //         } finally {
    //             setLoading(false)
    //         }
    //     })()
    // }, [])

    return (
        <div className='page-container'>
            <div className='page-section--normal'>
                <h1 className='heading-1 heading-1--top-left-corner'>{text.title}</h1>
            </div>
            {/* {loading && <Spinner width={50} height={50} />} */}
            {/* {!loading && error && (
                <Alert
                    variant='danger'
                    className='page-section--normal page-section--alert'
                >
                    {error}
                </Alert>
            )} */}
            {(
                <>
                    <div className='flex justify-between items-center 400px:gap-[1rem] 400px:p-0 1000px:justify-end 1000px:p-[0_0_1rem_0] page-section--normal'>
                        {/* @ts-ignore */}
                        {/* <Button
                            href=''
                            variant='secondary-outlined'
                            trailingIcon={<List className=''/>}
                            onClick={toggleFilter}
                            size='medium'
                            className={`1000px:hidden ${
                                isFilterOpen ? 'active' : ''
                            }`}
                        >
                            Filter
                        </Button> */}
                        <div className='button-group justify-end 1000px:mr-[1.5rem]'>
                            {/* <GroupToggle
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
                                activeVariant='primary-outlined'
                                inactiveVariant='secondary-outlined'
                                // onOptionChange={handleOptionChange}
                                // activeOptionIndex={viewToggleIndex}
                                groupVariant='ghost'
                                buttonVariant='ghost'
                                size='medium'
                            /> */}
                        </div>
                    </div>
                    <div className='page-section--without-gaps'>
                        <div className='p-[0_0.5rem] 400px:p-[0_1rem] 800px:p-[0_2rem] 1000px:grid 1000px:grid-cols-[17rem_auto] 1000px:gap-[3vw] events'>
                            <div className='events_section--left'>
                                {/* <div
                                    className={`events_filter-container ${
                                        isFilterOpen ? 'block' : ''
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
                                </div> */}
                                <Alert
                                    variant='danger'
                                    className='page-section--normal page-section--alert'
                                >
                                    {lang === 'no' ? 'Filtre er midlertidig deaktivert. De kommer tilbake snart!' : 'Filters are temporarily disabled. They will be back soon.'}
                                </Alert>
                            </div>
                            <div className='events_section--right'>
                                <ul
                                    className={`events_list events_list${
                                        // @ts-expect-error
                                        eventsView === 'grid-view' ? 'grid grid-cols-1 gap-[1rem] 600px:grid-cols-2 800px:gap-[2rem]' : '--list-view'
                                    }`}
                                >
                                    {/* events.currentWeekEvents &&
                                    events.currentWeekEvents.length > 0 && ( */}
                                    {events && (
                                        <>
                                            {/* <div className='event-list-separator event-list-seperator--first'>
                                                <p className='event-list-separator_text'>
                                                    {text.thisWeek}
                                                </p>
                                            </div> */}
                                            {/* @ts-ignore */}
                                            {events.map((e, idx) => (
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
                                            {/* {groupedEvents.currentWeekEvents.map((e, idx) => (
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
                                            ))} */}
                                        </>
                                    )
                                    }

                                    {/* {events.nextWeekEvents && */}
                                    {events && (
                                        // events.nextWeekEvents.length > 0 && (
                                        <>
                                            {/* <div className='event-list-separator'>
                                                <p className='event-list-separator_text'>
                                                    {text.nextWeek}
                                                </p>
                                            </div> */}
                                            {/* @ts-ignore */}
                                            {/* {groupedEvents.nextWeekEvents.map((e, idx) => (
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
                                            ))} */}
                                        </>
                                    )
                                    }

                                    {/* {events.futureEvents &&
                                        events.futureEvents.length > 0 && ( */}
                                    {events && (
                                        <>
                                            {/* {events.currentWeekEvents.length +
                                            events.nextWeekEvents.length > 0 && ( */}
                                            {(
                                                <div className='event-list-separator'>
                                                    <p className='event-list-separator_text'>
                                                        {text.later}
                                                    </p>
                                                </div>
                                            )}
                                            {/*  @ts-ignore eslint-disable-next-line */}
                                            {/* {events.futureEvents.map((e: EventProps, idx: number) => (
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
                                            ))} */}
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
                                            className='events_load-more-btn'
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

// eslint-disable-next-line
async function getCategoryFilters() {
    try {
        const [categoryFilterData, err] = await getEventCategoryFilters()
        if (err) {
            throw new Error(JSON.stringify(err))
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
