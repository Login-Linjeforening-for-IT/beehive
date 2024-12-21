import { useRef, useState, useEffect } from "react"
// @ts-ignore
import { withTranslation } from "react-i18next"
import Button from "../button/Button"
import CheckBox from "../checkbox/Checkbox"
import CheckTag from "../checktag/Checktag"
import "./filter.css"

// @ts-ignore
function getFilterGroupItemOnSelectWithin(onSelect, filterGroupItemID) {
    // @ts-ignore
    return (filterID, isSelected) => {
        onSelect(filterGroupItemID, filterID, isSelected)
    }
}

// @ts-ignore
function getFilterItemOnSelect(onSelect, filterID) {
    // @ts-ignore
    return (isSelected) => {
        onSelect(filterID, isSelected)
    }
}

// @ts-ignore
const Filter = withTranslation()(({ i18n, label, filter, showCount, onSelect, type, resetTrigger }) => {

    const lang = i18n.language === "en" ? "en" : "no"

    return (
        <div className="filter">
            <div className="filter__title">{ label[lang] }</div>
            <div className={`filter__items filter__items--${type}`}>
                {/* @ts-ignore */}
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
                    )
                })}
            </div>
        </div>
    )
})

// @ts-ignore
const FilterItem = withTranslation()(({ i18n, filter, showCount, onSelect, resetTrigger, type }) => {
    const lang = i18n.language === "en" ? "en" : "no"
    const [ checked, setChecked ] = useState(false)

    useEffect(() => {
        setChecked(false)
    }, [resetTrigger])

    function select() {
        setChecked(!checked)
        onSelect(!checked)
    }

    if(type == "tag") {
        return (
            <CheckTag
            // @ts-ignore
                onChange={e => select(e.target.checked)}
                id={filter.label[lang]}
                label={filter.label[lang]}
                checked={checked}
                // @ts-ignore
                count={showCount ? filter.count : false}
            />
        )
    }
    return (
        // @ts-ignore
        <CheckBox
        // @ts-ignore
            onChange={e => select(e.target.checked)}
            id={filter.label[lang]}
            label={filter.label[lang]}
            checked={checked}
        />
    )
})

// @ts-ignore
function FilterGroup({ t, filters, onApply, close = false }) {
    const selectedFilters = useRef({})
    const [ resetTrigger, setResetTrigger ] = useState(false)

    function onReset() {
        selectedFilters.current = {}
        setResetTrigger(!resetTrigger)
        apply()
    }

    function apply() {
        const f = {}

        Object.entries(selectedFilters.current).forEach(([filterGroupItemID, filterGroupItem]) => {
            // @ts-ignore
            const choices = Array.from(filterGroupItem)
            // @ts-ignore
            if (choices.length) f[filterGroupItemID] = Array.from(filterGroupItem)
        })

        onApply(f)
    }

    // @ts-ignore
    function onSelect(filterGroupItemID, filterID, isSelected) {
        if (filterGroupItemID in selectedFilters.current) {
            if (!isSelected) {
                // @ts-ignore
                selectedFilters.current[filterGroupItemID].delete(filterID)
            } else {
                // @ts-ignore
                selectedFilters.current[filterGroupItemID].add(filterID)
            }
        } else if (isSelected) {
            // @ts-ignore
            selectedFilters.current[filterGroupItemID] = new Set([filterID])
        }

        apply()
    }

    return (
        <div className="filter-groups">
            {
                Object.entries(filters).map(([filterGroupItemID, filterGroupItem]) => {
                    // @ts-ignore
                    if(Object.values(filterGroupItem.filters).length > 0) {
                        return (
                            <Filter
                                key={filterGroupItemID}
                                // @ts-ignore
                                label={filterGroupItem.label}
                                // @ts-ignore
                                showCount={filterGroupItem.showCount}
                                // @ts-ignore
                                filter={Object.values(filterGroupItem.filters)}
                                // @ts-ignore
                                type={filterGroupItem.type}
                                onSelect={getFilterGroupItemOnSelectWithin(onSelect, filterGroupItemID)}
                                resetTrigger={resetTrigger}
                            />
                        )
                    }
                })
            }
            <div className="filter-groups__buttons">
                {/* @ts-ignore */}
                <Button
                    variant="secondary-outlined"
                    trailingIcon={<i className='material-symbols-sharp'>replay</i>}
                    onClick={onReset}
                    size="medium"
                    className="filter-groups__reset"
                >
                    {t("reset")}
                </Button>
                {close &&
                // @ts-ignore
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
    )
}

export default withTranslation("filter")(FilterGroup)