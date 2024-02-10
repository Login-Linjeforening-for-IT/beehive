

const prepFilter = (data, id, label, idKey='id', getLabel, countKey='count', type, showCount=false) => {
    const filters = {};
  
    for (let value of Object.values(data)) {
        filters[value[idKey]] = {
            id: value[idKey],
            label: getLabel(value),
            count: value[countKey],
        };
    }
    
    return {
        id: id,
        label: label,
        filters: filters,
        type: type,
        showCount: showCount
    };
}

export default prepFilter