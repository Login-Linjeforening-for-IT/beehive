import { useRef, useState, useEffect } from "react";
import './filter.css';

const getFilterGroupItemOnSelectWithin = (onSelect, filterGroupItemID) => {
    return (filterID, isSelected) => {
        onSelect(filterGroupItemID, filterID, isSelected);
    }
}

export const FilterGroup = ({ filters, onApply }) => {
    const selectedFilters = useRef({});
    const [ resetTrigger, setResetTrigger ] = useState(false);

    const onReset = () => {
        selectedFilters.current = {};
        setResetTrigger(!resetTrigger);
        apply();
    }

    const apply = () => {
        const f = {};

        Object.entries(selectedFilters.current).forEach(([filterGroupItemID, filterGroupItem]) => {
            const choices = Array.from(filterGroupItem);
            if (choices.length) f[filterGroupItemID] = Array.from(filterGroupItem);
        });

        onApply(f);
    }

    const onSelect = (filterGroupItemID, filterID, isSelected) => {
        if (filterGroupItemID in selectedFilters.current) {
            if (!isSelected) {
                selectedFilters.current[filterGroupItemID].delete(filterID);
            } else {
                selectedFilters.current[filterGroupItemID].add(filterID);
            }
        } else if (isSelected) {
            selectedFilters.current[filterGroupItemID] = new Set([filterID]);
        }

        apply();
    }

    return (
        <div className="filter-groups">
            {
                Object.entries(filters).map(([filterGroupItemID, filterGroupItem]) => {
                    return (
                        <Filter
                            key={filterGroupItemID}
                            label={filterGroupItem.label}
                            filter={Object.values(filterGroupItem.filters)}
                            type={filterGroupItem.type}
                            onSelect={getFilterGroupItemOnSelectWithin(onSelect, filterGroupItemID)}
                            resetTrigger={resetTrigger}
                        />
                    );
                })
            }
            <div
                className="filter-groups__reset standard-button standard-button--discret"
                onClick={onReset}>
                Reset <i className='material-symbols-sharp'>replay</i>
            </div>
        </div>
    );
}

const getFilterItemOnSelect = (onSelect, filterID) => {
    return (isSelected) => {
        onSelect(filterID, isSelected);
    }
}

const Filter = ({ label, filter, onSelect, type, resetTrigger }) => {

    return (
        <div className="filter">
            <div className="filter__title">{ label }</div>
            <div className={`filter__items filter__items--${type}`}>
                {filter.map((filterItem) => {
                    return (
                        <FilterItem
                            key={filterItem.id}
                            filter={filterItem}
                            type={type}
                            onSelect={getFilterItemOnSelect(onSelect, filterItem.id)}
                            resetTrigger={resetTrigger}
                        />
                    );
                })}
            </div>
        </div>
    );
}

const FilterItem = ({ filter, onSelect, resetTrigger, type }) => {

    const [ checked, setChecked ] = useState(false);

    useEffect(() => {
        setChecked(false);
    }, [resetTrigger]);

    const select = () => {
        setChecked(!checked);
        onSelect(!checked);
    }

    return (
        <label className={`filter__item filter__item--${type}`} htmlFor={filter.label}>
            <input className={`filter__input filter__input--${type}`}
                id={filter.label}
                type='checkbox'
                onChange={e => select(e.target.checked)}
                checked={checked}
            />
            {type == "check" &&
                <div className="filter__checkbox"></div>
            }
            <div className={`filter__item-name filter__item-name--${type}`}>{filter.label}</div>
        </label>
    );
}