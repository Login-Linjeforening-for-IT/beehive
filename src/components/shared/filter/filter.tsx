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
import { language } from '../langtoggle/LangToggle'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

// eslint-disable-next-line
export default function FilterGroup({ filters, close = false }: any) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    
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
    }, [language])

    function onReset() {
        selectedFilters.current = {}
        setResetTrigger(!resetTrigger)
        apply()
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function onApply(f:any){
        const params = new URLSearchParams(searchParams?.toString())

        if (Object.values(f).length > 0) {
            params.set('categories', Object.values(f).join(','))
        }
        else {
            params.delete('categories') 
        }
        router.push(pathname+'?'+params.toString())
    }

    function params(){
        const params = new URLSearchParams(searchParams?.toString())
        params.delete('categories')
        return params.toString()
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
                (filters.filters && Object.values(filters.filters).length > 0) && (
                    <Filter
                        // @ts-ignore
                        label={filters.label}
                        // @ts-ignore
                        showCount={filters.showCount}
                        // @ts-ignore
                        filter={Object.values(filters.filters)}
                        // @ts-ignore
                        type={filters.type}
                        onSelect={getFilterGroupItemOnSelectWithin(onSelect,filters.filters)}
                        resetTrigger={resetTrigger}
                    />
                )
            }
            <div className='filter-groups_buttons'>
                {/* @ts-ignore */}
                <Button
                    href={pathname+'?'+params()}
                    target='_self'
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
                        target='_self'
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
    }, [language])

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
    }, [language])

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
