'use client'

import { useEffect, useState } from 'react'
import config from '@config'
import TabNavItem from '@components/shared/tabs/TabNavItem'
import TabContent from '@components/shared/tabs/TabContent'
import LogChamp from '@components/shared/logchamp/LogChamp'
import EvntkomLogo from '@components/svg/committeelogos/EvntkomLogo'
import BedkomLogo from '@components/svg/committeelogos/BedkomLogo'
import TekkomLogo from '@components/svg/committeelogos/TekkomLogo'
import CtfkomLogo from '@components/svg/committeelogos/CtfkomLogo'
import StyretLogo from '@components/svg/committeelogos/StyretLogo'
import SatkomLogo from '@components/svg/committeelogos/SatkomLogo'
import PrLogo from '@components/svg/committeelogos/PrLogo'
import text_no from '@text/about/no.json'
import text_en from '@text/about/en.json'
import board_no from '@text/board/no.json'
import board_en from '@text/board/en.json'
import '@components/shared/tabs/tabs.css'
import { getCookie } from '@utils/cookies'
// import { getCookie } from '@utils/cookies'

const no = {...text_no, ...board_no}
const en = {...text_en, ...board_en}

const no_board = {...board_no}
const en_board = {...board_en}

export default function CommitteeTabs() {
    const [activeTab, setActiveTab] = useState('styret')
    const [lang, setLang] = useState('no')
    const [text, setText] = useState(no)
    const [board, setBoard] = useState(no_board)
    const boardKeys = Object.keys(board)
    const actualBoard = Array.isArray(boardKeys) ? boardKeys : []

    useEffect(() => {
        const text = lang === 'no' ? no : en
        const board = lang === 'no' ? no_board : en_board
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setText(text as any)
        // eslint-disable-next-line
        setBoard(board as any)
    }, [lang])

    useEffect(() => {
        const temp = getCookie('lang')
        setLang( temp || 'no')
    }, [])

    return (
        <div className='mb-[2rem] 800px:mb-[5rem] tabs page-section--without-gaps'>
            <ul className='grid grid-cols-4 gap-[0.5rem] p-[0.5rem] 450px:grid-cols-7 1200px:px-[2rem]'>
                <TabNavItem title={<StyretLogo/>} id='styret' activeTab={activeTab} setActiveTab={setActiveTab}/>
                <TabNavItem title={<EvntkomLogo/>} id='event' activeTab={activeTab} setActiveTab={setActiveTab}/>
                <TabNavItem title={<TekkomLogo/>} id='tek' activeTab={activeTab} setActiveTab={setActiveTab}/>
                <TabNavItem title={<BedkomLogo/>} id='bedkom' activeTab={activeTab} setActiveTab={setActiveTab}/>
                <TabNavItem title={<CtfkomLogo/>} id='ctf' activeTab={activeTab} setActiveTab={setActiveTab}/>
                <TabNavItem title={<SatkomLogo/>} id='sat' activeTab={activeTab} setActiveTab={setActiveTab}/>
                <TabNavItem title={<PrLogo/>} id='pr' activeTab={activeTab} setActiveTab={setActiveTab}/>
            </ul>
            <TabContent id='styret' activeTab={activeTab}>
                <div className='grid grid-cols-1 justify-around 432px:gap-[1rem] 432px:grid-cols-[repeat(auto-fit,11rem)] 800px:gap-[4rem]'>
                    <div className='col-span-full'>
                        <h3 className='heading-3 flex items-center gap-[0.5rem]'>
                            <i className='logfont-styret-filled text-4xl' /> {text.committeeSection.board.title}
                        </h3>
                        <p className='p--highlighted'>{text.committeeSection.board.body}</p>
                    </div>
                    {actualBoard.map((key) => (
                        <LogChamp
                            key={key}
                            // eslint-disable-next-line
                            img={`${config.url.CDN_URL}/img/board/portraits/${(board as any)[key].img}`}
                            // eslint-disable-next-line
                            name={(board as any)[key].name}
                            // eslint-disable-next-line
                            position={(board as any)[key].title}
                            // eslint-disable-next-line
                            discord={(board as any)[key].dctag}
                            // eslint-disable-next-line
                            discordLink={(board as any)[key].dclink}
                        />
                    ))}
                </div>
            </TabContent>
            <TabContent id='event' activeTab={activeTab}>
                <h3 className='heading-3 flex items-center gap-[0.5rem]'>
                    <i className='logfont-evntkom text-4xl' /> {text.committeeSection.evntkom.title}
                </h3>
                <div className='grid grid-cols-1 gap-[3rem] items-start 800px:grid-cols-[auto_11rem]'>
                    <div className='max-w-[45rem]'>
                        <p className='p--highlighted'>{text.committeeSection.evntkom.intro}</p>
                        <p className='p--regular' dangerouslySetInnerHTML={{__html: text.committeeSection.evntkom.body}} />
                    </div>
                    <LogChamp
                        img={config.url.CDN_URL + '/img/board/portraits/' +  text.evntkomLeader.img}
                        name={text.evntkomLeader.name}
                        position={text.evntkomLeader.title}
                        discord={text.evntkomLeader.dctag}
                        discordLink={text.evntkomLeader.dclink}
                    />
                </div>
            </TabContent>
            <TabContent id='tek' activeTab={activeTab}>
                <h3 className='heading-3 flex items-center gap-[0.5rem]'>
                    <i className='logfont-tekkom text-4xl' /> {text.committeeSection.tekkom.title}
                </h3>
                <div className='grid grid-cols-1 gap-[3rem] items-start 800px:grid-cols-[auto_11rem]'>
                    <div className='max-w-[45rem]'>
                        <p className='p--highlighted'>{text.committeeSection.tekkom.intro}</p>
                        <p className='p--regular'>{text.committeeSection.tekkom.body}</p>
                    </div>
                    <LogChamp
                        img={`${config.url.CDN_URL}/img/board/portraits/${text.tekkomLeader.img}`}
                        name={text.tekkomLeader.name}
                        position={text.tekkomLeader.title}
                        discord={text.tekkomLeader.dctag}
                        discordLink={text.tekkomLeader.dclink}
                    />
                </div>
            </TabContent>
            <TabContent id='bedkom' activeTab={activeTab}>
                <h3 className='heading-3 flex items-center gap-[0.5rem]'>
                    <i className='logfont-bedkom text-4xl' /> {text.committeeSection.bedkom.title}
                </h3>
                <div className='grid grid-cols-1 gap-[3rem] items-start 800px:grid-cols-[auto_11rem]'>
                    <div className='max-w-[45rem]'>
                        <p className='p--highlighted'>{text.committeeSection.bedkom.intro}</p>
                        <p className='p--regular'>{text.committeeSection.bedkom.body}</p>
                    </div>
                    <LogChamp
                        img={config.url.CDN_URL + '/img/board/portraits/' +  text.bedkomLeader.img}
                        name={text.bedkomLeader.name}
                        position={text.bedkomLeader.title}
                        discord={text.bedkomLeader.dctag}
                        discordLink={text.bedkomLeader.dclink}
                    />
                </div>
            </TabContent>
            <TabContent id='ctf' activeTab={activeTab}>
                <h3 className='heading-3 flex items-center gap-[0.5rem]'>
                    <i className='logfont-ctfkom text-4xl' /> {text.committeeSection.ctfkom.title}
                </h3>
                <div className='grid grid-cols-1 gap-[3rem] items-start 800px:grid-cols-[auto_11rem]'>
                    <div className='max-w-[45rem]'>
                        <p className='p--highlighted'>{text.committeeSection.ctfkom.intro}</p>
                        <p className='p--regular' dangerouslySetInnerHTML={{__html: text.committeeSection.ctfkom.body}}/>
                    </div>
                    <LogChamp
                        img={config.url.CDN_URL + '/img/board/portraits/' +  text.ctfkomLeader.img}
                        name={text.ctfkomLeader.name}
                        position={text.ctfkomLeader.title}
                        discord={text.ctfkomLeader.dctag}
                        discordLink={text.ctfkomLeader.dclink}
                    />
                </div>
            </TabContent>
            <TabContent id='sat' activeTab={activeTab}>
                <h3 className='heading-3 flex items-center gap-[0.5rem]'>
                    <i className='logfont-satkom-filled text-4xl' /> {text.committeeSection.satkom.title}
                </h3>
                <div className='grid grid-cols-1 gap-[3rem] items-start 800px:grid-cols-[auto_11rem]'>
                    <div className='max-w-[45rem]'>
                        <p className='p--highlighted' dangerouslySetInnerHTML={{__html: text.committeeSection.satkom.intro}} />
                        <p className='p--regular'>{text.committeeSection.satkom.body}</p>
                    </div>
                    <LogChamp
                        img={config.url.CDN_URL + '/img/board/portraits/' +  text.satkomLeader.img}
                        name={text.satkomLeader.name}
                        position={text.satkomLeader.title}
                        discord={text.satkomLeader.dctag}
                        discordLink={text.satkomLeader.dclink}
                    />
                </div>
            </TabContent>
            <TabContent id='pr' activeTab={activeTab}>
                <h3 className='heading-3 flex items-center gap-[0.5rem]'>
                    <i className='logfont-pr text-4xl' /> {text.committeeSection.pr.title}
                </h3>
                <div className='grid grid-cols-1 gap-[3rem] items-start 800px:grid-cols-[auto_11rem]'>
                    <div className='max-w-[45rem]'>
                        <p className='p--highlighted' dangerouslySetInnerHTML={{__html: text.committeeSection.pr.intro}} />
                        <p className='p--regular'>{text.committeeSection.pr.body}</p>
                    </div>
                    <LogChamp
                        img={config.url.CDN_URL + '/img/board/portraits/' +  text.prLeader.img}
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
