'use client'

import { useState, useEffect, useRef } from 'react'
import Spinner from '@components/shared/spinner/spinner'
// import JobadsListItem from '@components/jobad/JobadsListItem'
import Button from '@components/shared/button/Button'
import FilterGroup from '@components/shared/filter/filter'
import Alert from '@components/shared/alert/Alert'
import debounce from '@/utils/debounce'
import prepFilter from '@components/shared/filter/prepFilter'
import { getJobs, getJobCityFilters, getJobSkillFilters, getJobJobtypeFilters } from '@utils/api'
import no from '@text/jobadList/no.json'
import en from '@text/jobadList/en.json'
import './page.css'
import List from '@components/svg/symbols/List'
import ArrowDownWard from '@components/svg/symbols/ArrowDownWard'
import { getCookie } from '@utils/cookies'
import { language } from '@components/shared/langtoggle/LangToggle'

const jobTypeTranslations = {
    no: {
        summer: 'Sommerjobb',
        full: 'Fulltid',
        verv: 'Verv',
        part: 'Deltid'
    },
    en: {
        summer: 'Sommer job',
        full: 'Fulltime',
        verv: 'Voluntary',
        part: 'Parttime'
    }
}

export default function Jobads() {
    // eslint-disable-next-line
    const [ jobads, setJobads ] = useState<any[]>([])
    const [ filterData, setFilterData ] = useState({})
    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState<string | null>(null)
    // eslint-disable-next-line
    const filters = useRef<any>({})
    const limit = 10
    const offset = useRef(0)
    const [ showLoadMore, setShowLoadMore ] = useState(false)
    const [lang, setLang] = useState('no')
    const text = lang === 'no' ? no : en
    const temp_empty = lang === 'no'
        ? 'Oi! Her var det tomt... Kanskje din bedrift kunne vært interessert i å annonsere her?'
        : 'Oh! Looks empty... Maybe your company would be interested in advertising here?'
    const temp_deactivated = lang === 'no' 
        ? 'Siden er midlertidig deaktivert. Kommer tilbake snart!' 
        : 'Page is temporarily disabled. Will be back soon.'

    useEffect(() => {
        const temp = getCookie('lang')
        setLang( temp || 'no')
    }, [language])

    // eslint-disable-next-line
    const ap = debounce(async (v: any) => {
        filters.current = v

        try {
            const [ response, err ] = await getJobs(v.skills, v.cities, null, v.jobtypes, limit, 0)
            if (err) throw new Error(err)

            setShowLoadMore(response.length === limit)
            setJobads(response)
            offset.current = response.length
        } catch (error) {
            console.error('Error fetching filtered jobs:', error)
            setError('Failed to load jobs based on filters.')
        } finally {
            setLoading(false)
        }
    }, 50)

    async function loadItems() {
        try {
            const [ response, err ] = await getJobs(filters.current.skills, null, null, filters.current.jobtypes, limit, offset.current)
            if (err) throw new Error(err)

            setShowLoadMore(response.length === limit)
            offset.current = jobads.length + response.length
            setJobads((prevItems) => [...prevItems, ...response])
        } catch (error) {
            console.error('Error loading more jobs:', error)
            setError('Failed to load job ads.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const response = {}

                const jobtypeFilters = await getJobTypeFilters()
                // @ts-ignore
                if (jobtypeFilters) response['jobtypes'] = jobtypeFilters

                const cityFilters = await getCityFilters()
                // @ts-ignore
                if (cityFilters) response['cities'] = cityFilters

                const skillFilters = await getSkillFilters()
                // @ts-ignore
                if (skillFilters) response['skills'] = skillFilters

                setFilterData(response)
            } catch {
                setError('Failed to initialize job ads data.')
            } finally {
                setLoading(false)
            }
        })()

        loadItems()
    }, [])

    const [isFilterOpen, setIsFilterOpen] = useState(false)

    function toggleFilter() {
        setIsFilterOpen(prevState => !prevState)
    }

    return (
        <div className='page-container'>
            <h1 className='page-section--normal heading-1 heading-1--top-left-corner'>{text.title}</h1>
            {loading && <Spinner width={50} height={50} />}
            {/* @ts-ignore */}
            <Alert variant='danger' className='page-section--normal page-section--alert'>{temp_deactivated}</Alert>
            {/* {!loading && error && <Alert variant='danger' className='page-section--normal page-section--alert'>{error}</Alert>} */}
            {!loading && !error &&
            // <div className='page-section--normal'>
            //     {/* @ts-ignore */}
            //     <Button
            //         variant='secondary-outlined'
            //         trailingIcon={<List className=''/>}
            //         onClick={toggleFilter}
            //         size='medium'
            //         className={`hidden ${isFilterOpen ? 'active' : ''}`}
            //     >
            //         Filter
            //     </Button>

            //     <div className='1000px:grid 1000px:grid-cols-[20rem_aauto] 1000px:gap-[3vw] 1000px:p-[2rem_0]'>
            //         <div className='order-1'>
            //             <div className={`p-[1rem_1.5rem] hidden bg-[var(--color-bg-surface)] mt-[0.5rem] rounded-[var(--border-radius)] shadow-[var(--container-shadow)] ${isFilterOpen ? 'block' : ''}`}>
            //                 {filterData ? <FilterGroup filters={filterData} onApply={ap} close={toggleFilter}/> : 'No filter data available'}
            //             </div>
            //         </div>
            //         <div className='order-2'>
            //             <ul className='list-none pt-[1.5rem] 1000px:pt-0'>
            //                 {jobads.length ? jobads.map((e, idx) => (
            //                     <li key={idx}>
            //                         {/* <JobadsListItem jobad={e} /> */}
            //                     </li>
            //                 )) :
            //                     <p>{text.noResults}</p>
            //                 }
            //             </ul>
            //             {showLoadMore && jobads.length > 0 && (
            //                 <div className='flex justify-center'>
            //                     {/* @ts-ignore */}
            //                     <Button 
            //                         onClick={loadItems}
            //                         variant='secondary'
            //                         className='m-[2rem_0] 400px:w-fit 400px:min-w-[12rem] 400px:mx-auto'
            //                         trailingIcon={<ArrowDownWard className=''/>}
            //                     >
            //                         {text.loadMore}
            //                     </Button>
            //                 </div>
            //             )}
            //         </div>
            //     </div>
            // </div> 
        <></>}
        </div>
    )
}

function getLabelKey(key: string) {
    // eslint-disable-next-line
    return (v: any) => {
        return {
            'no': v[key],
            'en': v[key],
        }
    }
}

// eslint-disable-next-line
function getJobTypeLabel(v: any) {
    // @ts-ignore  
    const labelNo = jobTypeTranslations['no'][v['job_type']] || v['job_type']
    // @ts-ignore
    const labelEn = jobTypeTranslations['en'][v['job_type']] || labelNo
    return {
        no: labelNo,
        en: labelEn,
    }
}

async function getJobTypeFilters() {
    try {
        const [jobTypeFilterData, err] = await getJobJobtypeFilters()
        if (err) throw new Error(err)

        const label = {
            en: 'Type',
            no: 'Type'
        }

        return prepFilter(jobTypeFilterData, 'jobtypes', label, 'job_type', getJobTypeLabel, 'count', 'check')
    } catch (error) {
        console.error('Error fetching job type filters:', error)
        return null
    }
}

async function getCityFilters() {
    try {
        const [jobCityFilterData, err] = await getJobCityFilters()
        if (err) throw new Error(err)

        const label = {
            en: 'Cities',
            no: 'Byer'
        }

        return prepFilter(jobCityFilterData, 'cities', label, 'city', getLabelKey('city'), 'count', 'tag')
    } catch (error) {
        console.error('Error fetching city filters:', error)
        return null
    }
}

async function getSkillFilters() {
    try {
        const [jobSkillFilterData, err] = await getJobSkillFilters()
        if (err) throw new Error(err)

        const label = {
            en: 'Skills',
            no: 'Ferdigheter'
        }

        return prepFilter(jobSkillFilterData, 'skills', label, 'skill', getLabelKey('skill'), 'count', 'tag')
    } catch (error) {
        console.error('Error fetching skill filters:', error)
        return null
    }
}
