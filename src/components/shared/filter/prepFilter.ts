

// eslint-disable-next-line
export default function prepFilter(data: any, id: string, label: any, idKey = 'id', getLabel: any, countKey = 'count', type: any, showCount = false) {
    const filters = {}

    for (const value of Object.values(data)) {
        // @ts-ignore
        filters[value[idKey]] = {
            // @ts-ignore
            id: value[idKey],
            label: getLabel(value),
            // @ts-ignore
            count: value[countKey],
        }
    }

    return {
        id: id,
        label: label,
        filters: filters,
        type: type,
        showCount: showCount
    }
}
