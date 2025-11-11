'use client'

import { useState } from 'react'
import config from '@config'
import TabNavItem from '@components/tabs/tabNavItem'
import TabContent from '@components/tabs/tabContent'
import LogChamp from '@components/logchamp/logChamp'
import EvntkomLogo from '@components/svg/committeelogos/evntkomLogo'
import BedkomLogo from '@components/svg/committeelogos/bedkomLogo'
import TekkomLogo from '@components/svg/committeelogos/tekkomLogo'
import CtfkomLogo from '@components/svg/committeelogos/ctfkomLogo'
import StyretLogo from '@components/svg/committeelogos/styretLogo'
import SatkomLogo from '@components/svg/committeelogos/satkomLogo'
import PrLogo from '@components/svg/committeelogos/prLogo'
import text_no from '@text/about/no.json'
import text_en from '@text/about/en.json'
import board_no from '@text/board/no.json'
import board_en from '@text/board/en.json'
import '@components/tabs/tabs.css'
import useLang from '@/hooks/useLang'

const no = { ...text_no, board: board_no }
const en = { ...text_en, board: board_en }

export default function CommitteeTabs() {
    const [activeTab, setActiveTab] = useState('styret')
    const text = useLang(no, en)
    const boardKeys = Object.keys(text.board) as Array<keyof typeof text.board>
    const actualBoard = Array.isArray(boardKeys) ? boardKeys : []

    return (
        <div className='mb-[2rem] 800px:mb-[5rem] tabs page-section--without-gaps'>
            <ul className='grid grid-cols-4 gap-[0.5rem] p-[0.5rem] 450px:grid-cols-7 1200px:px-[2rem]'>
                <TabNavItem title={<StyretLogo />} id='styret' activeTab={activeTab} setActiveTab={setActiveTab} />
                <TabNavItem title={<EvntkomLogo />} id='event' activeTab={activeTab} setActiveTab={setActiveTab} />
                <TabNavItem title={<TekkomLogo />} id='tek' activeTab={activeTab} setActiveTab={setActiveTab} />
                <TabNavItem title={<BedkomLogo />} id='bedkom' activeTab={activeTab} setActiveTab={setActiveTab} />
                <TabNavItem title={<CtfkomLogo />} id='ctf' activeTab={activeTab} setActiveTab={setActiveTab} />
                <TabNavItem title={<SatkomLogo />} id='sat' activeTab={activeTab} setActiveTab={setActiveTab} />
                <TabNavItem title={<PrLogo />} id='pr' activeTab={activeTab} setActiveTab={setActiveTab} />
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
                            img={`${config.url.CDN_URL}/img/board/portraits/${text.board[key].img}`}
                            name={text.board[key].name}
                            position={text.board[key].title}
                            discord={text.board[key].dctag}
                            discordLink={text.board[key].dclink}
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
                        <p className='p--regular' dangerouslySetInnerHTML={{ __html: text.committeeSection.evntkom.body }} />
                    </div>
                    <LogChamp
                        img={`${config.url.CDN_URL}/img/board/portraits/${text.board.evntkomLeader.img}`}
                        name={text.board.evntkomLeader.name}
                        position={text.board.evntkomLeader.title}
                        discord={text.board.evntkomLeader.dctag}
                        discordLink={text.board.evntkomLeader.dclink}
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
                        img={`${config.url.CDN_URL}/img/board/portraits/${text.board.tekkomLeader.img}`}
                        name={text.board.tekkomLeader.name}
                        position={text.board.tekkomLeader.title}
                        discord={text.board.tekkomLeader.dctag}
                        discordLink={text.board.tekkomLeader.dclink}
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
                        img={`${config.url.CDN_URL}/img/board/portraits/${text.board.bedkomLeader.img}`}
                        name={text.board.bedkomLeader.name}
                        position={text.board.bedkomLeader.title}
                        discord={text.board.bedkomLeader.dctag}
                        discordLink={text.board.bedkomLeader.dclink}
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
                        <p className='p--regular' dangerouslySetInnerHTML={{ __html: text.committeeSection.ctfkom.body }} />
                    </div>
                    <LogChamp
                        img={`${config.url.CDN_URL}/img/board/portraits/${text.board.ctfkomLeader.img}`}
                        name={text.board.ctfkomLeader.name}
                        position={text.board.ctfkomLeader.title}
                        discord={text.board.ctfkomLeader.dctag}
                        discordLink={text.board.ctfkomLeader.dclink}
                    />
                </div>
            </TabContent>
            <TabContent id='sat' activeTab={activeTab}>
                <h3 className='heading-3 flex items-center gap-[0.5rem]'>
                    <i className='logfont-satkom-filled text-4xl' /> {text.committeeSection.satkom.title}
                </h3>
                <div className='grid grid-cols-1 gap-[3rem] items-start 800px:grid-cols-[auto_11rem]'>
                    <div className='max-w-[45rem]'>
                        <p className='p--highlighted' dangerouslySetInnerHTML={{ __html: text.committeeSection.satkom.intro }} />
                        <p className='p--regular'>{text.committeeSection.satkom.body}</p>
                    </div>
                    <LogChamp
                        img={`${config.url.CDN_URL}/img/board/portraits/${text.board.satkomLeader.img}`}
                        name={text.board.satkomLeader.name}
                        position={text.board.satkomLeader.title}
                        discord={text.board.satkomLeader.dctag}
                        discordLink={text.board.satkomLeader.dclink}
                    />
                </div>
            </TabContent>
            <TabContent id='pr' activeTab={activeTab}>
                <h3 className='heading-3 flex items-center gap-[0.5rem]'>
                    <i className='logfont-pr text-4xl' /> {text.committeeSection.pr.title}
                </h3>
                <div className='grid grid-cols-1 gap-[3rem] items-start 800px:grid-cols-[auto_11rem]'>
                    <div className='max-w-[45rem]'>
                        <p className='p--highlighted' dangerouslySetInnerHTML={{ __html: text.committeeSection.pr.intro }} />
                        <p className='p--regular'>{text.committeeSection.pr.body}</p>
                    </div>
                    <LogChamp
                        img={`${config.url.CDN_URL}/img/board/portraits/${text.board.prLeader.img}`}
                        name={text.board.prLeader.name}
                        position={text.board.prLeader.title}
                        discord={text.board.prLeader.dctag}
                        discordLink={text.board.prLeader.dclink}
                    />
                </div>
            </TabContent>
        </div>
    )
}
