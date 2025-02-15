'use client'

import { useRef, useState, useEffect } from 'react'
import Button from '@components/shared/button/Button'
import CheckBox from '@components/shared/checkbox/Checkbox'
import CheckTag from '@components/shared/checktag/Checktag'
import no from '@text/filter/no.json'
import en from '@text/filter/en.json'
import './filter.css'
import KeyboardArrowUp from '@components/svg/symbols/KeyboardArrowUp'
import Replay from '@components/svg/symbols/Replay'
import { getCookie } from '@utils/cookies'

// eslint-disable-next-line
export default function FilterGroup({ filters, onApply, close = false }: any) {
    const selectedFilters = useRef({})
    const [ resetTrigger, setResetTrigger ] = useState(false)
    const [lang, setLang] = useState('no')
    const [text, setText] = useState(no)

    useEffect(() => {
        const text = lang === 'no' ? no : en
        setText(text)
    }, [lang])

    useEffect(() => {
        const temp = getCookie('lang')
        setLang( temp || 'no')
    }, [])

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
        <div className='filter-groups'>
            {
                // eslint-disable-next-line
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
            <div className='filter-groups_buttons'>
                {/* @ts-ignore */}
                <Button
                    href=''
                    variant='secondary-outlined'
                    trailingIcon={<Replay className=''/>}
                    onClick={onReset}
                    size='medium'
                    className='filter-groups_reset'
                >
                    {text.reset}
                </Button>
                {close &&
                // @ts-ignore
                    <Button
                        href=''
                        variant='secondary-outlined'
                        leadingIcon={<KeyboardArrowUp className=''/>}
                        onClick={close}
                        size='medium'
                        className='filter-groups_close'
                    >
                    </Button>
                }
            </div>
        </div>
    )
}
// eslint-disable-next-line
function getFilterGroupItemOnSelectWithin(onSelect: any, filterGroupItemID: any) {
    // eslint-disable-next-line
    return (filterID: any, isSelected: any) => {
        onSelect(filterGroupItemID, filterID, isSelected)
    }
}

// eslint-disable-next-line
function getFilterItemOnSelect(onSelect: any, filterID: any) {
    // eslint-disable-next-line
    return (isSelected: any) => {
        onSelect(filterID, isSelected)
    }
}

// eslint-disable-next-line
function Filter({ label, filter, showCount, onSelect, type, resetTrigger }: any) {
    const [lang, setLang] = useState('no')

    useEffect(() => {
        const temp = getCookie('lang')
        setLang( temp || 'no')
    }, [])

    return (
        <div className='filter'>
            <div className='filter_title'>{ label[lang] }</div>
            <div className={`filter_items filter_items--${type}`}>
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
}

// eslint-disable-next-line
function FilterItem({ filter, showCount, onSelect, resetTrigger, type }: any) {
    const [ checked, setChecked ] = useState(false)
    const [lang, setLang] = useState('no')

    useEffect(() => {
        setChecked(false)
    }, [resetTrigger])

    useEffect(() => {
        const temp = getCookie('lang')
        setLang( temp || 'no')
    }, [])

    function select() {
        setChecked(!checked)
        onSelect(!checked)
    }

    if(type == 'tag') {
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
}
