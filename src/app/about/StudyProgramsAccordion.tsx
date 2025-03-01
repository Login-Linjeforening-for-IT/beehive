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
                <li className='flex flex-row accordion_content-item'>
                    {text.bachelor.computerEngineer}
                    <Link 
                        href='https://www.ntnu.no/studier/bidata' 
                        target='_blank'
                    >
                        <ArrowOutward className='w-[1.5rem] h-[1.5rem] fill-white'/>
                    </Link>
                </li>
                <li className='flex flex-row accordion_content-item'>
                    {text.bachelor.digsec}
                    <Link 
                        href='https://www.ntnu.no/studier/bdigsec'
                        target='_blank'
                    >
                        <ArrowOutward className='w-[1.5rem] h-[1.5rem] fill-white'/>
                    </Link>
                </li>
                <li className='flex flex-row accordion_content-item'>
                    {text.bachelor.prog}
                    <Link 
                        href='https://www.ntnu.no/studier/bprog'
                        target='_blank'
                    >
                        <ArrowOutward className='w-[1.5rem] h-[1.5rem] fill-white'/>
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
                    {text.master.infosec}
                    <Link 
                        href='https://www.ntnu.no/studier/mis'
                        target='_blank'
                    >
                        <ArrowOutward className='w-[1.5rem] h-[1.5rem] fill-white'/>
                    </Link>
                </li>
                <li className='flex flex-row accordion_content-item'>
                    {text.master.applied}
                    <Link 
                        href='https://www.ntnu.edu/studies/macs'
                        target='_blank'><ArrowOutward className='w-[1.5rem] h-[1.5rem] fill-white'/>
                    </Link>
                </li>
                <li className='flex flex-row accordion_content-item'>
                    {text.master.colorimg}
                    <Link 
                        href='https://www.ntnu.no/studier/mscosi'
                        target='_blank'
                    >
                        <ArrowOutward className='w-[1.5rem] h-[1.5rem] fill-white'/>
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
                    {text.phd.infosec}
                    <Link 
                        href='https://www.ntnu.no/studier/phisct'
                        target='_blank'
                    >
                        <ArrowOutward className='w-[1.5rem] h-[1.5rem] fill-white'/>
                    </Link>
                </li>
                <li className='flex flex-row accordion_content-item'>
                    {text.phd.data}
                    <Link 
                        href='https://www.ntnu.no/studier/phcos'
                        target='_blank'
                    >
                        <ArrowOutward className='w-[1.5rem] h-[1.5rem] fill-white'/>
                    </Link>
                </li>
                <li className='flex flex-row accordion_content-item'>
                    {text.phd.tele}
                    <Link 
                        href='https://www.ntnu.no/studier/phet'
                        target='_blank'
                    >
                        <ArrowOutward className='w-[1.5rem] h-[1.5rem] fill-white'/>
                    </Link>
                </li>
            </AccordionContent>
        </ul>
    )
}
