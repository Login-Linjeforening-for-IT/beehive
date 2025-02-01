'use client'

import AppContext from '@context/context'
import { useContext } from 'react'
import no from '@text/landing/no.json'
import en from '@text/landing/en.json'
import Link from 'next/link'

export default function EndCard({ path }: {path: string}) {
    const { lang } = useContext(AppContext)
    const text = lang === 'en' ? en : no

    return (
        <li className='snap-center max-w-[22rem] 800px:w-full 800px:max-w-[28rem] w-fit min-w-[14rem] 1000px:hidden'>
            <Link href={path} className='group w-full h-full rounded-[var(--border-radius)] flex justify-center items-center flex-col hover:bg-[var(--color-bg-surface)]'>
                <div className='group-hover:shadow-none w-[5.2rem] h-[5.2rem] bg-[var(--color-bg-surface)] rounded-full shadow-[var(--container-shadow)]'>
                    <div className='w-[1.8rem] h-[1.8rem] mt-[1.8rem] ml-[1.8rem] border-r-[.35rem] border-b-[.35rem] border-[var(--color-primary)] transform rotate-[-45deg] z-5 transition duration-200' />
                </div>
                <div className='text-[1.3rem] font-[500] pt-[1rem]'>
                    {text.eventsPreview.seeAll}
                </div>
            </Link>
        </li>
    )
}
