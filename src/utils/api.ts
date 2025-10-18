import config from '@config'

const baseUrl = config.url.API_URL

export async function getJob(jobID: number): Promise<GetJobProps | string> {
    const path = `/jobs/${jobID}`
    return await fetchWrapper(path)
}

export async function getJobRow(jobID: number) {
    const path = `/jobs/${jobID}/row`
    return await fetchWrapper(path)
}

export async function getJobs(skills: string | null = null, cities: string | null = null, organizations: string | null = null, jobtypes: string | null = null, limit = 20, offset = 0): Promise<GetJobsProps | string> {
    const queryParts = new URLSearchParams({ limit: String(limit), offset: String(offset) })

    if (skills) queryParts.append('skills', skills)
    if (cities) queryParts.append('cities', cities)
    if (organizations) queryParts.append('organizations', organizations)
    if (jobtypes) queryParts.append('jobtypes', jobtypes)

    const path = `/jobs/?${queryParts.toString()}`
    return await fetchWrapper(path)
}

export async function getEvent(eventID: number): Promise<GetEventProps | string> {
    const path = `/events/${eventID}`
    return await fetchWrapper(path)
}

export async function getEventRow(eventID: number) {
    const path = `/events/${eventID}/row`
    return await fetchWrapper(path)
}

export async function getEvents(categories: string | null = null, limit = 20, offset = 0, highlighted = false): Promise<GetEventsProps | string> {
    const queryParams = new URLSearchParams({ limit: String(limit), offset: String(offset) })

    if (categories) queryParams.append('categories', categories)
    if (highlighted) queryParams.append('highlighted', String(highlighted))
    const path = `/events/?${queryParams.toString()}`
    return await fetchWrapper(path)
}

export async function getEventCategoryFilters() {
    const path = '/events/categories'
    return await fetchWrapper(path)
}

export async function getJobJobtypeFilters() {
    const path = '/jobs/types'
    return await fetchWrapper(path)
}

export async function getJobSkillFilters() {
    const path = '/jobs/skills'
    return await fetchWrapper(path)
}

export async function getJobCityFilters() {
    const path = '/jobs/cities'
    return await fetchWrapper(path)
}

export async function getJobOrganizationFilters() {
    const path = '/filters/jobs/organizations'
    return await fetchWrapper(path)
}

async function fetchWrapper(path: string, options = {}) {
    const defaultOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }
    const finalOptions = { ...defaultOptions, ...options }

    try {
        const response = await fetch(`${baseUrl}${path}`, finalOptions)
        const data = await response.text()

        if (!response.ok) {
            throw new Error(data)
        }

        return JSON.parse(data)
    // eslint-disable-next-line
    } catch (error: any) {
        return JSON.stringify(error.message) || 'Unknown error! Please contact TekKom'
    }
}
