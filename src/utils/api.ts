import config from '@config'

const baseUrl = config.url.API_URL

type GetParamsProps = {
    type?: string
    search?: string
    offset?: number
    limit?: number
    orderBy?: string
    sort?: 'asc' | 'desc'
}

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

// Albums
export async function getAlbums({ search, offset, limit, orderBy, sort }: GetParamsProps = {}): Promise<GetAlbumsProps | string> {
    const queryParts = new URLSearchParams()
    if (search)     queryParts.append('search', String(search))
    if (offset)     queryParts.append('offset', String(offset))
    if (limit)      queryParts.append('limit', String(limit))
    if (orderBy)    queryParts.append('orderBy', String(orderBy))
    if (sort)       queryParts.append('sort', String(sort))

    const path = `/albums?${queryParts.toString()}`
    console.log(path)
    return await fetchWrapper(path)
}

export async function getAlbum(albumID: number): Promise<GetAlbumProps | string> {
    const path = `/albums/${albumID}`
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
