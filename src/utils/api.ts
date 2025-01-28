import config from '@config'

const baseUrl = config.url.API_URL

export async function getJob(jobID: number) {
    const path = `/jobs/${jobID}`
    return await _fetchWrapper(path)
}

export async function getJobRow(jobID: number) {
    const path = `/jobs/${jobID}/row`
    return await _fetchWrapper(path)
}

export async function getJobs(skills: string[] | null = null, cities: string[] | null = null, organizations: string[] | null = null, jobtypes: string[] | null = null, limit = 20, offset = 0) {
    const queryParts = new URLSearchParams({ limit: String(limit), offset: String(offset) })

    if (skills) queryParts.append('skills', skills.join(','))
    if (cities) queryParts.append('cities', cities.join(','))
    if (organizations) queryParts.append('organizations', organizations.join(','))
    if (jobtypes) queryParts.append('jobtypes', jobtypes.join(','))

    const path = `/jobs/?${queryParts.toString()}`
    return await _fetchWrapper(path)
}

export async function getEvent(eventID: number) {
    const path = `/events/${eventID}`
    return await _fetchWrapper(path)
}

export async function getEventRow(eventID: number) {
    const path = `/events/${eventID}/row`
    return await _fetchWrapper(path)
}

export async function getEvents(categories: string[] | null = null, limit = 20, offset = 0, highlighted = false) {
    const queryParams = new URLSearchParams({ limit: String(limit), offset: String(offset) })

    if (categories) queryParams.append('categories', categories.join(','))
    if (highlighted) queryParams.append('highlighted', String(highlighted))
    const path = `/events/?${queryParams.toString()}`
    return await _fetchWrapper(path)
}


export async function getEventCategoryFilters() {
    const path = '/filters/events/categories'
    return await _fetchWrapper(path)
}

export async function getJobJobtypeFilters() {
    const path = '/filters/jobs/jobtypes'
    return await _fetchWrapper(path)
}

export async function getJobSkillFilters() {
    const path = '/filters/jobs/skills'
    return await _fetchWrapper(path)
}

export async function getJobCityFilters() {
    const path = '/filters/jobs/cities'
    return await _fetchWrapper(path)
}

export async function getJobOrganizationFilters() {
    const path = '/filters/jobs/organizations'
    return await _fetchWrapper(path)
}

async function _fetchWrapper(path: string, options = {}) {
    const defaultOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }
    const finalOptions = { ...defaultOptions, ...options }

    try {
        const response = await fetch(`${baseUrl}${path}`, finalOptions)
        const data = await response.json()

        if (!response.ok) {
            return [null, data]
        }

        return [data, null]
    // eslint-disable-next-line
    } catch (error: any) {
        return [null, error.message || 'Unknown error! Please contact TekKom']
    }
}
