const baseUrl = 'http://localhost:8080/api';

const _apiFetch = async (path) => {
    try {
        const response = await fetch(baseUrl + path, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'mode': 'no-cors',
            },
        });
        const data = await response.json();
        return response.ok ? [data, null] : [null, data];
    } catch (error) {
        return [null, error];
    }
}

const _arrayToQueryString = (arr) => {
    return arr.join(',');
}

const getJob = async (jobID) => {
    const path = `/jobs/${jobID}/`;
    return await _apiFetch(path);
}

const getJobs = async (skills = null, cities = null, organizations = null, jobtypes = null, limit = 20, offset = 0) => {
    const queryParts = { limit, offset };
    skills && (queryParts.skills = _arrayToQueryString(skills));
    cities && (queryParts.cities = _arrayToQueryString(cities));
    organizations && (queryParts.organizations = _arrayToQueryString(organizations));
    jobtypes && (queryParts.jobtypes = _arrayToQueryString(jobtypes));

    const query = new URLSearchParams(queryParts);
    const path = `/jobs/?${query}`;
    console.log('path', path)
    return await _apiFetch(path);
}

const getEvent = async (eventID) => {
    const path = `/events/${eventID}/`;
    return await _apiFetch(path);
}

const getEvents = async (categories = null, limit = 20, offset = 0) => {
    const queryParts = { limit, offset };
    categories && (queryParts.categories = _arrayToQueryString(categories));

    const query = new URLSearchParams(queryParts);
    const path = `/events/?${query}`;
    console.log('path', path)
    return await _apiFetch(path);
}

const getEventCategoryFilters = async () => {
    const path = `/filters/events/categories/`;
    return await _apiFetch(path);
}

const getJobJobtypeFilters = async () => {
    const path = `/filters/jobs/jobtypes/`;
    return await _apiFetch(path);
}

const getJobSkillFilters = async () => {
    const path = `/filters/jobs/skills/`;
    return await _apiFetch(path);
}

const getJobCityFilters = async () => {
    const path = `/filters/jobs/cities/`;
    return await _apiFetch(path);
}

const getJobOrganizationFilters = async () => {
    const path = `/filters/jobs/organizations/`;
    return await _apiFetch(path);
}

export {
    getEvent,
    getEvents,

    getEventCategoryFilters,

    getJob,
    getJobs,

    getJobJobtypeFilters,
    getJobSkillFilters,
    getJobCityFilters,
    getJobOrganizationFilters,
}
