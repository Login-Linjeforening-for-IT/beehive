'use client'

import { useEffect, useState } from 'react'
import TabNavItem from '@components/shared/tabs/TabNavItem'
import TabContent from '@components/shared/tabs/TabContent'
import LogChamp from '@components/shared/logchamp/LogChamp'
import EventkomLogo from '@components/svg/committeelogos/EventkomLogo'
import BedkomLogo from '@components/svg/committeelogos/BedkomLogo'
import TekkomLogo from '@components/svg/committeelogos/TekkomLogo'
import CtfkomLogo from '@components/svg/committeelogos/CtfkomLogo'
import SatkomLogo from '@components/svg/committeelogos/SatkomLogo'
import PrLogo from '@components/svg/committeelogos/PrLogo'
import config from '@config'
import '@components/shared/tabs/tabs.css'
import en from '@text/verv/en.json'
import no from '@text/verv/no.json'
import board_no from '@text/board/no.json'
import board_en from '@text/board/en.json'
import { getCookie } from '@utils/cookies'

export default function VervTabs() {
    const [activeTab, setActiveTab] = useState('event')
    const [lang, setLang] = useState('no')
    const [text, setText] = useState({ ...no, ...board_no })

    useEffect(() => {
        const text = lang === 'en' ? { ...en, ...board_en } : { ...no, ...board_no }
        // eslint-disable-next-line
        setText(text as any)
    }, [lang])

    useEffect(() => {
        const temp = getCookie('lang')
        setLang( temp || 'no')
    }, [])

    return (
        <div className='tabs committees page-section--without-gaps'>
            <ul className='grid grid-cols-3 justify-between 500px:flex 500px:flex-nowrap 500px:justify-between tabs_nav'>
                <TabNavItem
                    key='event'
                    title={<EventkomLogo />}
                    id='event'
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
                <TabNavItem
                    key='tek'
                    title={<TekkomLogo />}
                    id='tek'
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
                <TabNavItem
                    key='bedkom'
                    title={<BedkomLogo />}
                    id='bedkom'
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
                <TabNavItem
                    key='ctf'
                    title={<CtfkomLogo />}
                    id='ctf'
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
                <TabNavItem
                    key='sat'
                    title={<SatkomLogo />}
                    id='sat'
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
                <TabNavItem
                    key='pr'
                    title={<PrLogo />}
                    id='pr'
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
            </ul>
            <TabContent id='event' activeTab={activeTab}>
                <h3 className='mb-0 heading-3'>
                    <i className='logfont-eventkom' />{' '}
                    {text.committeeSection.eventkom.title}
                </h3>
                <div className='grid gap-[3rem] items-start grid-cols-auto 800px:grid-cols-[auto_11rem]'>
                    <div className='col-[1_/_-2] max-w-[45rem]'>
                        <p className='p--highlighted'>
                            {text.committeeSection.eventkom.intro}
                        </p>
                        <p
                            className='p--regular'
                            dangerouslySetInnerHTML={{
                                __html: text.committeeSection.eventkom.body,
                            }}
                        />
                    </div>
                    <LogChamp
                        img={`${config.url.CDN_URL}/img/portraits/${text.evntkomLeader.img}`}
                        name={text.evntkomLeader.name}
                        position={text.evntkomLeader.title}
                        discord={text.evntkomLeader.dctag}
                        discordLink={text.evntkomLeader.dclink}
                    />
                </div>
            </TabContent>
            <TabContent id='tek' activeTab={activeTab}>
                <h3 className='mb-0 heading-3'>
                    <i className='logfont-tekkom' />{' '}
                    {text.committeeSection.tekkom.title}
                </h3>
                <div className='grid gap-[3rem] items-start grid-cols-auto 800px:grid-cols-[auto_11rem]'>
                    <div className='col-[1_/_-2] max-w-[45rem]'>
                        <p className='p--highlighted'>
                            {text.committeeSection.tekkom.intro}
                        </p>
                        <p className='p--regular'>{text.committeeSection.tekkom.body}</p>
                    </div>
                    <LogChamp
                        img={`${config.url.CDN_URL}/img/portraits/${text.tekkomLeader.img}`}
                        name={text.tekkomLeader.name}
                        position={text.tekkomLeader.title}
                        discord={text.tekkomLeader.dctag}
                        discordLink={text.tekkomLeader.dclink}
                    />
                </div>
            </TabContent>
            <TabContent id='bedkom' activeTab={activeTab}>
                <h3 className='mb-0 heading-3'>
                    <i className='logfont-bedkom' />{' '}
                    {text.committeeSection.bedkom.title}
                </h3>
                <div className='grid gap-[3rem] items-start grid-cols-auto 800px:grid-cols-[auto_11rem]'>
                    <div className='col-[1_/_-2] max-w-[45rem]'>
                        <p className='p--highlighted'>
                            {text.committeeSection.bedkom.intro}
                        </p>
                        <p className='p--regular'>{text.committeeSection.bedkom.body}</p>
                    </div>
                    <LogChamp
                        img={`${config.url.CDN_URL}/img/portraits/${text.bedkomLeader.img}`}
                        name={text.bedkomLeader.name}
                        position={text.bedkomLeader.title}
                        discord={text.bedkomLeader.dctag}
                        discordLink={text.bedkomLeader.dclink}
                    />
                </div>
            </TabContent>
            <TabContent id='ctf' activeTab={activeTab}>
                <h3 className='mb-0 heading-3'>
                    <i className='logfont-ctfkom' />{' '}
                    {text.committeeSection.ctfkom.title}
                </h3>
                <div className='grid gap-[3rem] items-start grid-cols-auto 800px:grid-cols-[auto_11rem]'>
                    <div className='col-[1_/_-2] max-w-[45rem]'>
                        <p className='p--highlighted'>
                            {text.committeeSection.ctfkom.intro}
                        </p>
                        <p
                            className='p--regular'
                            dangerouslySetInnerHTML={{
                                __html: text.committeeSection.ctfkom.body,
                            }}
                        />
                    </div>
                    <LogChamp
                        img={`${config.url.CDN_URL}/img/portraits/${text.ctfkomLeader.img}`}
                        name={text.ctfkomLeader.name}
                        position={text.ctfkomLeader.title}
                        discord={text.ctfkomLeader.dctag}
                        discordLink={text.ctfkomLeader.dclink}
                    />
                </div>
            </TabContent>
            <TabContent id='sat' activeTab={activeTab}>
                <h3 className='mb-0 heading-3'>
                    <i className='logfont-satkom-filled' />{' '}
                    {text.committeeSection.satkom.title}
                </h3>
                <div className='grid gap-[3rem] items-start grid-cols-auto 800px:grid-cols-[auto_11rem]'>
                    <div className='col-[1_/_-2] max-w-[45rem]'>
                        <p
                            className='p--highlighted'
                            dangerouslySetInnerHTML={{
                                __html: text.committeeSection.satkom.intro,
                            }}
                        />
                        <p className='p--regular'>{text.committeeSection.satkom.body}</p>
                    </div>
                    <LogChamp
                        img={`${config.url.CDN_URL}/img/portraits/${text.satkomLeader.img}`}
                        name={text.satkomLeader.name}
                        position={text.satkomLeader.title}
                        discord={text.satkomLeader.dctag}
                        discordLink={text.satkomLeader.dclink}
                    />
                </div>
            </TabContent>
            <TabContent id='pr' activeTab={activeTab}>
                <h3 className='mb-0 heading-3'>
                    <i className='logfont-pr' /> {text.committeeSection.pr.title}
                </h3>
                <div className='grid gap-[3rem] items-start grid-cols-auto 800px:grid-cols-[auto_11rem]'>
                    <div className='col-[1_/_-2] max-w-[45rem]'>
                        <p
                            className='p--highlighted'
                            dangerouslySetInnerHTML={{
                                __html: text.committeeSection.pr.intro,
                            }}
                        />
                        <p className='p--regular'>{text.committeeSection.pr.body}</p>
                    </div>
                    <LogChamp
                        img={`${config.url.CDN_URL}/img/portraits/${text.prLeader.img}`}
                        name={text.prLeader.name}
                        position={text.prLeader.title}
                        discord={text.prLeader.dctag}
                        discordLink={text.prLeader.dclink}
                    />
                </div>
            </TabContent>
        </div>
    )
}
