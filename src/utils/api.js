import { config } from "../Constants";

const baseUrl = config.url.API_URL;


const _fetchWrapper = async (path, options = {}) => {
    const defaultOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const finalOptions = { ...defaultOptions, ...options };

    try {
        const response = await fetch(baseUrl + path, finalOptions);
        const data = await response.json();

        if (!response.ok) {
            return [null, data];
        }

        return [data, null];
    } catch (error) {
        return [null, error.message || 'Unknown error! Please contact TekKom'];
    }
};

const getJob = async (jobID) => {
    const path = `/jobs/${jobID}`;
    return await _fetchWrapper(path);
}

const getJobRow = async (jobID) => {
    const path = `/jobs/${jobID}/row`;
    return await _fetchWrapper(path);
}

const getJobs = async (skills = null, cities = null, organizations = null, jobtypes = null, limit = 20, offset = 0) => {
    const queryParts = new URLSearchParams({ limit, offset });

    if (skills) queryParts.append('skills', skills.join(','));
    if (cities) queryParts.append('cities', cities.join(','));
    if (organizations) queryParts.append('organizations', organizations.join(','));
    if (jobtypes) queryParts.append('jobtypes', jobtypes.join(','));

    const path = `/jobs/?${queryParts.toString()}`;
    return await _fetchWrapper(path);
}

const getEvent = async (eventID) => {
    const path = `/events/${eventID}`;
    return await _fetchWrapper(path);
}

const getEventRow = async (eventID) => {
    const path = `/events/${eventID}/row`;
    return await _fetchWrapper(path);
}

const getEvents = async (categories = null, limit = 20, offset = 0, highlighted=false) => {
    const queryParams = new URLSearchParams({ limit, offset });

    if (categories) queryParams.append('categories', categories.join(','));
    if (highlighted) queryParams.append('highlighted', highlighted);

    const path = `/events/?${queryParams.toString()}`;
    return await _fetchWrapper(path);
}


const getEventCategoryFilters = async () => {
    const path = `/filters/events/categories`;
    return await _fetchWrapper(path);
}

const getJobJobtypeFilters = async () => {
    const path = `/filters/jobs/jobtypes`;
    return await _fetchWrapper(path);
}

const getJobSkillFilters = async () => {
    const path = `/filters/jobs/skills`;
    return await _fetchWrapper(path);
}

const getJobCityFilters = async () => {
    const path = `/filters/jobs/cities`;
    return await _fetchWrapper(path);
}

const getJobOrganizationFilters = async () => {
    const path = `/filters/jobs/organizations`;
    return await _fetchWrapper(path);
}

export {
    getEvent,
    getEventRow,
    getEvents,

    getEventCategoryFilters,

    getJob,
    getJobRow,
    getJobs,

    getJobJobtypeFilters,
    getJobSkillFilters,
    getJobCityFilters,
    getJobOrganizationFilters,
}
