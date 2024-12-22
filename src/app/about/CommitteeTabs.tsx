import { useState } from "react"
import { config } from "@constants"
// @ts-ignore
import board from "@assets/boardmembers/boardmembers.json"
import TabNavItem from "@components/tabs/TabNavItem"
import TabContent from "@components/tabs/TabContent"
import LogChamp from "@components/logchamp/LogChamp"
import EventkomLogo from "@components/svg/committeelogos/EventkomLogo"
import BedkomLogo from "@components/svg/committeelogos/BedkomLogo"
import TekkomLogo from "@components/svg/committeelogos/TekkomLogo"
import CtfkomLogo from "@components/svg/committeelogos/CtfkomLogo"
import StyretLogo from "@components/svg/committeelogos/StyretLogo"
import SatkomLogo from "@components/svg/committeelogos/SatkomLogo"
import PrLogo from "@components/svg/committeelogos/PrLogo"
import no from '@text/about/no.json'
import en from '@text/about/en.json'
import "@components/tabs/Tabs.css"
import "@app/about/CommitteeTabs.css"
import getCookie from "@utils/getCookie"

const lang = getCookie('lang') as 'no' | 'en' || 'no'
const text = lang === 'en' ? en : no

export default function CommitteeTabs() {

    const [activeTab, setActiveTab] = useState("styret")
    const useEng = lang === "en"

    return (
        <div className='about-section tabs committees page-section--without-gaps'>
            <ul className='tabs__nav'>
                <TabNavItem title={<StyretLogo/>} id='styret' activeTab={activeTab} setActiveTab={setActiveTab}/>
                <TabNavItem title={<EventkomLogo/>} id='event' activeTab={activeTab} setActiveTab={setActiveTab}/>
                <TabNavItem title={<TekkomLogo/>} id='tek' activeTab={activeTab} setActiveTab={setActiveTab}/>
                <TabNavItem title={<BedkomLogo/>} id='bedkom' activeTab={activeTab} setActiveTab={setActiveTab}/>
                <TabNavItem title={<CtfkomLogo/>} id='ctf' activeTab={activeTab} setActiveTab={setActiveTab}/>
                <TabNavItem title={<SatkomLogo/>} id='sat' activeTab={activeTab} setActiveTab={setActiveTab}/>
                <TabNavItem title={<PrLogo/>} id='pr' activeTab={activeTab} setActiveTab={setActiveTab}/>
            </ul>
            <TabContent id='styret' activeTab={activeTab}>
                <div className='board-members'>
                    <div className='board-members__intro'>
                        <h3 className='committees__heading heading-3'>
                            <i className='logfont-styret-filled'></i> {text.committeeSection.board.title}
                        </h3>
                        <p className='p--highlighted'>{text.committeeSection.board.body}</p>
                    </div>
                    {Object.keys(board).map((key) => (
                        <LogChamp
                            key={key}
                            img={`${config.url.CDN_URL}/img/portraits/${board[key].img}`}
                            name={board[key].name}
                            position={lang == "en" ? board[key].title_en : board[key].title_no}
                            discord={board[key].dctag}
                            discordLink={board[key].dclink}
                        />
                    ))}
                </div>
            </TabContent>
            <TabContent id='event' activeTab={activeTab}>
                <h3 className='committees__heading heading-3'>
                    <i className='logfont-eventkom'></i> {text.committeeSection.eventkom.title}
                </h3>
                <div className='committees__info'>
                    <div className='committees__text'>
                        <p className='p--highlighted'>{text.committeeSection.eventkom.intro}</p>
                        <p className='p--regular' dangerouslySetInnerHTML={{__html: text.committeeSection.eventkom.body}} />
                    </div>
                    <LogChamp 
                        img={config.url.CDN_URL + "/img/portraits/" +  board.eventkomLeader.img}
                        name={board.eventkomLeader.name}
                        position={useEng ? board.eventkomLeader.title_en : board.eventkomLeader.title_no}
                        discord={board.eventkomLeader.dctag}
                        discordLink={board.eventkomLeader.dclink}
                    />
                </div>
            </TabContent>
            <TabContent id='tek' activeTab={activeTab}>
                <h3 className='committees__heading heading-3'>
                    <i className='logfont-tekkom'></i> {text.committeeSection.tekkom.title}
                </h3>
                <div className='committees__info'>
                    <div className='committees__text'>
                        <p className='p--highlighted'>{text.committeeSection.tekkom.intro}</p>
                        <p className='p--regular'>{text.committeeSection.tekkom.body}</p>
                    </div>
                    <LogChamp 
                        img={`${config.url.CDN_URL}/img/portraits/${board.tekkomLeader.img}`}
                        name={board.tekkomLeader.name}
                        position={useEng ? board.tekkomLeader.title_en : board.tekkomLeader.title_no}
                        discord={board.tekkomLeader.dctag}
                        discordLink={board.tekkomLeader.dclink}
                    />
                </div>
            </TabContent>
            <TabContent id='bedkom' activeTab={activeTab}>
                <h3 className='committees__heading heading-3'>
                    <i className='logfont-bedkom'></i> {text.committeeSection.bedkom.title}
                </h3>
                <div className='committees__info'>
                    <div className='committees__text'>
                        <p className='p--highlighted'>{text.committeeSection.bedkom.intro}</p>
                        <p className='p--regular'>{text.committeeSection.bedkom.body}</p>
                    </div>
                    <LogChamp 
                        img={config.url.CDN_URL + "/img/portraits/" +  board.bedkomLeader.img}
                        name={board.bedkomLeader.name}
                        position={useEng ? board.bedkomLeader.title_en : board.bedkomLeader.title_no}
                        discord={board.bedkomLeader.dctag}
                        discordLink={board.bedkomLeader.dclink}
                    />
                </div>
            </TabContent>
            <TabContent id='ctf' activeTab={activeTab}>
                <h3 className='committees__heading heading-3'>
                    <i className='logfont-ctfkom'></i> {text.committeeSection.ctfkom.title}
                </h3>
                <div className='committees__info'>
                    <div className='committees__text'>
                        <p className='p--highlighted'>{text.committeeSection.ctfkom.intro}</p>
                        <p className='p--regular' dangerouslySetInnerHTML={{__html: text.committeeSection.ctfkom.body}}/>
                    </div>
                    <LogChamp 
                        img={config.url.CDN_URL + "/img/portraits/" +  board.ctfkomLeader.img}
                        name={board.ctfkomLeader.name}
                        position={useEng ? board.ctfkomLeader.title_en : board.ctfkomLeader.title_no}
                        discord={board.ctfkomLeader.dctag}
                        discordLink={board.ctfkomLeader.dclink}
                    />
                </div>
            </TabContent>
            <TabContent id='sat' activeTab={activeTab}>
                <h3 className='committees__heading heading-3'>
                    <i className='logfont-satkom-filled'></i> {text.committeeSection.satkom.title}
                </h3>
                <div className='committees__info'>
                    <div className='committees__text'>
                        <p className='p--highlighted' dangerouslySetInnerHTML={{__html: text.committeeSection.satkom.intro}} />
                        <p className='p--regular'>{text.committeeSection.satkom.body}</p>
                    </div>
                    <LogChamp 
                        img={config.url.CDN_URL + "/img/portraits/" +  board.satkomLeader.img}
                        name={board.satkomLeader.name}
                        position={useEng ? board.satkomLeader.title_en : board.satkomLeader.title_no}
                        discord={board.satkomLeader.dctag}
                        discordLink={board.satkomLeader.dclink}
                    />
                </div>
            </TabContent>
            <TabContent id='pr' activeTab={activeTab}>
                <h3 className='committees__heading heading-3'>
                    <i className='logfont-pr'></i> {text.committeeSection.pr.title}
                </h3>
                <div className='committees__info'>
                    <div className='committees__text'>
                        <p className='p--highlighted' dangerouslySetInnerHTML={{__html: text.committeeSection.pr.intro}} />
                        <p className='p--regular'>{text.committeeSection.pr.body}</p>
                    </div>
                    <LogChamp 
                        img={config.url.CDN_URL + "/img/portraits/" +  board.prLeader.img}
                        name={board.prLeader.name}
                        position={useEng ? board.prLeader.title_en : board.prLeader.title_no}
                        discord={board.prLeader.dctag}
                        discordLink={board.prLeader.dclink}
                    />
                </div>
            </TabContent>
        </div>
    )
}
