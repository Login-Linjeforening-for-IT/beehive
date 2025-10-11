

// eslint-disable-next-line
export default function prepFilter(data: any, id: string, label: any, idKey = 'id', getLabel: any, countKey = 'count', type: any, showCount = false) {
    const filters: { [key: string]: any } = {}
    if (Array.isArray(data.categories)) {
        for (const value of data.categories) {
            filters[value[idKey]] = {
                id: value[idKey],
                label: getLabel(value),
                count: value[countKey],
            }
        }
    } else {
        console.warn('prepFilter: data.categories is not an array', data.categories)
    }
    return {
        id: id,
        label: label,
        filters: filters,
        type: type,
        showCount: showCount
    }
}
