// import { useState, useEffect, useRef } from 'react'
// import Spinner from '@components/shared/spinner/spinner'
import JobadsListItem from '@components/jobad/JobadsListItem'
// import Button from '@components/shared/button/Button'
// import FilterGroup from '@components/shared/filter/filter'
import Alert from '@components/shared/alert/Alert'
// import debounce from '@/utils/debounce'
import prepFilter from '@components/shared/filter/prepFilter'
import { getJobs, getJobCityFilters, getJobSkillFilters, getJobJobtypeFilters } from '@utils/api'
import no from '@text/jobadList/no.json'
import en from '@text/jobadList/en.json'
import './page.css'
// import List from '@components/svg/symbols/List'
// import ArrowDownWard from '@components/svg/symbols/ArrowDownWard'
// import { getCookie } from '@utils/cookies'
import { cookies } from 'next/headers'
import FilterItem from '@components/shared/filter/filterItem'

export default async function Jobads({searchParams}: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

    const filters = (await searchParams)

    const jobtypes = typeof filters.jobtypes === 'string' ? filters.jobtypes : null
    const cities = typeof filters.cities === 'string' ? filters.cities : null
    const skills = typeof filters.skills === 'string' ? filters.skills : null

    const lang = ((await cookies()).get('lang')?.value || 'no') as Lang
    const text = lang === 'no' ? no : en

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: { skills?: any[], cities?: any[], jobtypes?: any[] } = {}

    const jobtypeFilters = await getJobTypeFilters()
    // @ts-ignore
    if (jobtypeFilters) response['jobtypes'] = jobtypeFilters

    const cityFilters = await getCityFilters()
    // @ts-ignore
    if (cityFilters) response['cities'] = cityFilters

    const skillFilters = await getSkillFilters()
    // @ts-ignore
    if (skillFilters) response['skills'] = skillFilters

    const limit = 10

    const jobads = await getJobs(skills, cities, null, jobtypes, limit, 0)
    return (
        <div className='page-container'>
            <h1 className='page-section--normal heading-1 heading-1--top-left-corner'>{text.title}</h1>
            {/* {loading && <Spinner width={50} height={50} />} */}
            <div className='page-section--normal'>
                <div className='1000px:grid 1000px:grid-cols-[20rem_auto] 1000px:gap-[3vw] 1000px:p-[2rem_0]'>
                    <div className='order-1'>
                        <FilterItem filterData={response} />
                    </div>
                    <div className='order-2'>
                        <ul className='list-none pt-[1.5rem] 1000px:pt-0'>
                            {typeof jobads !== 'string' && Array.isArray(jobads.jobs) && jobads.jobs.length ? jobads.jobs.map((e: GetJobProps, idx: number) => (
                                <li key={idx}>
                                    <JobadsListItem jobad={e} />
                                </li>
                            )) :
                                <Alert
                                    variant='info'
                                    className='page-section--normal page-section--alert'
                                >
                                    {lang === 'no' ? 'Oi! Her var det tomt... Kanskje din bedrift kunne vært interessert i å annonsere her?' : 'Oh! Looks empty... Maybe your company would be interested in advertising here?'}
                                </Alert>
                            }
                        </ul>
                        {/* {showLoadMore && jobads.length > 0 && (
                            // <div className='flex justify-center'>

                            //     <Button
                            //         onClick={loadItems}
                            //         variant='secondary'
                            //         className='m-[2rem_0] 400px:w-fit 400px:min-w-[12rem] 400px:mx-auto'
                            //         trailingIcon={<ArrowDownWard className=''/>}
                            //     >
                            //         {text.loadMore}
                            //     </Button>
                            // </div>
                        )} */}
                    </div>
                </div>
            </div>
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
    return {
        no: v.name_no,
        en: v.name_en,
    }
}

async function getJobTypeFilters() {
    try {
        const jobTypeFilterData = await getJobJobtypeFilters()
        if (typeof jobTypeFilterData === 'string')
            throw new Error(jobTypeFilterData)

        const label = {
            en: 'Type',
            no: 'Type'
        }

        return prepFilter(jobTypeFilterData, 'jobtypes', label, 'id', getJobTypeLabel, 'total_count', 'check')
    } catch(error) {
        console.error('Error fetching job type filters:', error)
        return null
    }
}

async function getCityFilters() {
    try {
        const jobCityFilterData = await getJobCityFilters()
        if (typeof jobCityFilterData === 'string')
            throw new Error(jobCityFilterData)

        const label = {
            en: 'Cities',
            no: 'Byer'
        }

        return prepFilter(jobCityFilterData, 'cities', label, 'name', getLabelKey('name'), 'count', 'tag')
    } catch(error) {
        console.error('Error fetching city filters:', error)
        return null
    }
}

async function getSkillFilters() {
    try {
        const jobSkillFilterData = await getJobSkillFilters()
        if (typeof jobSkillFilterData === 'string')
            throw new Error(jobSkillFilterData)

        const label = {
            en: 'Skills',
            no: 'Ferdigheter'
        }

        return prepFilter(jobSkillFilterData, 'skills', label, 'name', getLabelKey('name'), 'count', 'tag')
    } catch(error) {
        console.error('Error fetching skill filters:', error)
        return null
    }
}
