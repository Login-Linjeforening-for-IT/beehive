import { useRef, useState, useEffect } from "react";
import { withTranslation } from "react-i18next";
import Button from "../button/Button";
import CheckBox from "../checkbox/Checkbox"
import CheckTag from "../checktag/Checktag"
import './filter.css';

function getFilterGroupItemOnSelectWithin(onSelect, filterGroupItemID) {
    return (filterID, isSelected) => {
        onSelect(filterGroupItemID, filterID, isSelected);
    }
}

function getFilterItemOnSelect(onSelect, filterID) {
    return (isSelected) => {
        onSelect(filterID, isSelected);
    }
}

const Filter = withTranslation()(({ i18n, label, filter, showCount, onSelect, type, resetTrigger }) => {

    const lang = i18n.language === "en" ? "en" : "no";

    return (
        <div className="filter">
            <div className="filter__title">{ label[lang] }</div>
            <div className={`filter__items filter__items--${type}`}>
                {filter.sort((a, b) => b.count - a.count).map((filterItem) => {
                    return (
                        <FilterItem
                            key={filterItem.id}
                            filter={filterItem}
                            type={type}
                            showCount={showCount}
                            onSelect={getFilterItemOnSelect(onSelect, filterItem.id)}
                            resetTrigger={resetTrigger}
                        />
                    );
                })}
            </div>
        </div>
    );
})

const FilterItem = withTranslation()(({ i18n, filter, showCount, onSelect, resetTrigger, type }) => {
    const lang = i18n.language === "en" ? "en" : "no";
    const [ checked, setChecked ] = useState(false);

    useEffect(() => {
        setChecked(false);
    }, [resetTrigger]);

    function select() {
        setChecked(!checked);
        onSelect(!checked);
    }

    if(type == 'tag') {
        return (
            <CheckTag
                onChange={e => select(e.target.checked)}
                id={filter.label[lang]}
                label={filter.label[lang]}
                checked={checked}
                count={showCount ? filter.count : false}
            />
        )
    }
    return (
        <CheckBox
            onChange={e => select(e.target.checked)}
            id={filter.label[lang]}
            label={filter.label[lang]}
            checked={checked}
        />
    )
});

function FilterGroup({ t, filters, onApply, close = false }) {
    const selectedFilters = useRef({});
    const [ resetTrigger, setResetTrigger ] = useState(false);

    function onReset() {
        selectedFilters.current = {};
        setResetTrigger(!resetTrigger);
        apply();
    }

    function apply() {
        const f = {};

        Object.entries(selectedFilters.current).forEach(([filterGroupItemID, filterGroupItem]) => {
            const choices = Array.from(filterGroupItem);
            if (choices.length) f[filterGroupItemID] = Array.from(filterGroupItem);
        });

        onApply(f);
    }

    function onSelect(filterGroupItemID, filterID, isSelected) {
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
                    if(Object.values(filterGroupItem.filters).length > 0) {
                        return (
                            <Filter
                                key={filterGroupItemID}
                                label={filterGroupItem.label}
                                showCount={filterGroupItem.showCount}
                                filter={Object.values(filterGroupItem.filters)}
                                type={filterGroupItem.type}
                                onSelect={getFilterGroupItemOnSelectWithin(onSelect, filterGroupItemID)}
                                resetTrigger={resetTrigger}
                            />
                        );
                    }
                })
            }
            <div className="filter-groups__buttons">
                <Button
                    variant="secondary-outlined"
                    trailingIcon={<i className='material-symbols-sharp'>replay</i>}
                    onClick={onReset}
                    size="medium"
                    className="filter-groups__reset"
                >
                    {t('reset')}
                </Button>
                {close &&
                    <Button
                        variant="secondary-outlined"
                        leadingIcon={<i className='material-symbols-sharp'>keyboard_arrow_up</i>}
                        onClick={close}
                        size="medium"
                        className="filter-groups__close"
                    >
                    </Button>
                }
            </div>
        </div>
    );
}

export default withTranslation("filter")(FilterGroup);