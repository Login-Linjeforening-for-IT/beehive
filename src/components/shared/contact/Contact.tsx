'use client'

import MazeMapEmbed from '@components/shared/mazemap/MazeMapEmbed'
import no from '@text/contact/no.json'
import en from '@text/contact/en.json'
import TravelExplore from '@components/svg/symbols/TravelExplore'
import config from '@config'
import useLang from '@/hooks/useLang'

export default function Contact() {
    const text = useLang(no, en)

    return(
        <div>
            <h2 className='heading-2 heading-2--icon'>
                <TravelExplore className='w-[3rem] h-[3rem] fill-[var(--color-text-main)] mr-4' />
                <span>{text.contact.title}</span>
            </h2>
            <div className='flex flex-col 800px:flex-row gap-4 justify-between w-full'>
                <div className='w-fit min-w-[16rem]'>
                    <h4 className='heading-4'>{text.contact.address}:</h4>
                    <p className='p--regular'>
                        Login - Linjeforeningen for IT
                        <br/>
                        Teknologivegen 22
                        <br/>
                        Bygg A, rom 155
                        <br/>
                        2815 GJØVIK
                    </p>
                    <h4 className='heading-4'>{text.contact.email}:</h4>
                    <p className='p--regular'>
                        <a
                            className='link link--primary link--underscore-hover'
                            href={`mailto:${config.url.MAIL_URL}`}
                        >
                            {config.url.MAIL_URL}
                        </a>
                    </p>
                </div>
                <div className='w-full max-w-[40rem] pt-4'>
                    <MazeMapEmbed poi={229153} height={345} />
                </div>
            </div>
        </div>
    )
}
