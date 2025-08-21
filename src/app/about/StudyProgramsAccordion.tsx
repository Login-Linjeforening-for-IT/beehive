'use client'

import AccordionItem from '@components/shared/accordion/AccordionItem'
import AccordionContent from '@components/shared/accordion/AccordionContent'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import no from '@text/about/no.json'
import en from '@text/about/en.json'
import ArrowOutward from '@components/svg/symbols/ArrowOutward'
import { getCookie } from '@utils/cookies'
import { language } from '@components/shared/langtoggle/LangToggle'

export default function StudyProgramsAccordion() {
    const [activeAccordionItem, setActiveAccordionItem] = useState('bachelor')
    const [lang, setLang] = useState('no')
    const text = lang === 'no' ? no : en

    useEffect(() => {
        const temp = getCookie('lang')
        setLang( temp || 'no')
    }, [language])

    return(
        <ul className='w-full accordion'>
            <AccordionItem 
                id='bachelor' 
                title={'Bachelor'} 
                activeAccordionItem={activeAccordionItem} 
                setActiveAccordionItem={setActiveAccordionItem} 
            />
            <AccordionContent id='bachelor' activeAccordionItem={activeAccordionItem}>
                <li className='accordion_content-item'>
                    <Link 
                        href='https://www.ntnu.no/studier/bidata' 
                        target='_blank'
                        className='flex flex-row items-center gap-[0.5rem]'
                    >
                        {text.bachelor.computerEngineer}
                        <ArrowOutward className='max-w-[1.5rem] w-full h-[1.5rem] fill-[var(--color-text-main)]'/>
                    </Link>
                </li>
                <li className='flex flex-row accordion_content-item'>
                    <Link 
                        href='https://www.ntnu.no/studier/bdigsec'
                        target='_blank'
                        className='flex flex-row items-center gap-[0.5rem]'
                    >
                        {text.bachelor.digsec}
                        <ArrowOutward className='max-w-[1.5rem] w-full h-[1.5rem] fill-[var(--color-text-main)]'/>
                    </Link>
                </li>
                <li className='flex flex-row accordion_content-item'>
                    <Link 
                        href='https://www.ntnu.no/studier/bprog'
                        target='_blank'
                        className='flex flex-row items-center gap-[0.5rem]'
                    >
                        {text.bachelor.prog}
                        <ArrowOutward className='max-w-[1.5rem] w-full h-[1.5rem] fill-[var(--color-text-main)]'/>
                    </Link>
                </li>
            </AccordionContent>
            <AccordionItem 
                id='master'
                title={'Master'}
                activeAccordionItem={activeAccordionItem}
                setActiveAccordionItem={setActiveAccordionItem}
            />
            <AccordionContent id='master' activeAccordionItem={activeAccordionItem}>
                <li className='flex flex-row accordion_content-item'>
                    
                    <Link 
                        href='https://www.ntnu.no/studier/mis'
                        target='_blank'
                        className='flex flex-row items-center gap-[0.5rem]'
                    >
                        {text.master.infosec}
                        <ArrowOutward className='max-w-[1.5rem] w-full h-[1.5rem] fill-[var(--color-text-main)]'/>
                    </Link>
                </li>
                <li className='flex flex-row accordion_content-item'>
                    <Link 
                        href='https://www.ntnu.edu/studies/macs'
                        target='_blank'
                        className='flex flex-row items-center gap-[0.5rem]'
                    >
                        {text.master.applied}
                        <ArrowOutward className='max-w-[1.5rem] w-full h-[1.5rem] fill-[var(--color-text-main)]'/>
                    </Link>
                </li>
                <li className='accordion_content-item'>
                    <Link 
                        href='https://www.ntnu.no/studier/mscosi'
                        target='_blank'
                        className='flex flex-row items-center gap-[0.5rem]'
                    >
                        {text.master.colorimg}
                        <ArrowOutward className='max-w-[1.5rem] w-full h-[1.5rem] fill-[var(--color-text-main)]'/>
                    </Link>
                </li>
            </AccordionContent>
            <AccordionItem 
                id='phd'
                title={'Ph.d'} 
                activeAccordionItem={activeAccordionItem}
                setActiveAccordionItem={setActiveAccordionItem}
            />
            <AccordionContent id='phd' activeAccordionItem={activeAccordionItem}>
                <li className='flex flex-row accordion_content-item'>
                    <Link 
                        href='https://www.ntnu.no/studier/phisct'
                        target='_blank'
                        className='flex flex-row items-center gap-[0.5rem]'
                    >
                        {text.phd.infosec}
                        <ArrowOutward className='max-max-w-[1.5rem] w-full h-[1.5rem] fill-[var(--color-text-main)]'/>
                    </Link>
                </li>
                <li className='flex flex-row accordion_content-item'>
                    <Link 
                        href='https://www.ntnu.no/studier/phcos'
                        target='_blank'
                        className='flex flex-row items-center gap-[0.5rem]'
                    >
                        {text.phd.data}
                        <ArrowOutward className='max-w-[1.5rem] w-full h-[1.5rem] fill-[var(--color-text-main)]'/>
                    </Link>
                </li>
                <li className='flex flex-row accordion_content-item'>
                    <Link 
                        href='https://www.ntnu.no/studier/phet'
                        target='_blank'
                        className='flex flex-row items-center gap-[0.5rem]'
                    >
                        {text.phd.tele}
                        <ArrowOutward className='max-max-w-[1.5rem] w-full h-[1.5rem] fill-[var(--color-text-main)]'/>
                    </Link>
                </li>
            </AccordionContent>
        </ul>
    )
}
