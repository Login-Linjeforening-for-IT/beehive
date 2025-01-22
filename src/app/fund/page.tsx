'use client'

import config from '@config'
import LogChamp from '@components/shared/logchamp/LogChamp'
import DecoratedPicture from '@components/shared/images/decoratedpicture/DecoratedPicture'
import no from '@text/fund/no.json'
import en from '@text/fund/en.json'
import './page.css'
import { useContext } from 'react'
import AppContext from '@context/context'
import Chart from '@components/svg/symbols/Chart'
import Group from '@components/svg/symbols/Group'
import Diversity from '@components/svg/symbols/Diversity'
import ChartDetailed from '@components/svg/symbols/ChartDetailed'
import Office from '@components/svg/symbols/Office'

export default function Fund() {
    const { lang } = useContext(AppContext)
    // eslint-disable-next-line
    const text: any = lang === 'en' ? {...en} : {...no}

    const boardMembers = text.board.members

    return (
        <div className='page-container'>
            <div className="page-section--normal">
                <h1 className='heading-1 heading-1--top-left-corner'>{text.title}</h1>
            </div>
            <section className='page-section--normal fund-intro'>
                <p className='p--highlighted'>{text.intro}</p>
            </section>
            <section className='page-section--without-gaps fund-section fund-section--highlighted'>
                <h2 className='heading-2'>{text.support.title}</h2>
                <p className='p--highlighted' dangerouslySetInnerHTML={{__html: text.support.intro}}/>
                <h3 className='heading-4'>{text.support.heading1}</h3>
                <p className='p--regular'>{text.support.body1}</p>
                <h3 className='heading-4'>{text.support.heading2}</h3>
                <p className='p--regular'>{text.support.body2}</p>
                <h3 className='heading-4'>{text.support.heading3}</h3>
                <p className='p--regular' dangerouslySetInnerHTML={{__html: text.support.body3}}/>
            </section>
            <section className='page-section--normal fund-section'>
                <div className='fund-section_container fund-section_container--grid'>
                    {/* @ts-ignore */}
                    <div className='fund-section_container--grid-item'>
                        <h2 className='flex flex-row heading-2 heading-2--icon'>
                            <Chart size="3rem" fill="white" className="mr-4"/>
                            <span>{text.purpose.title}</span>
                        </h2>
                        <p className='p--regular' dangerouslySetInnerHTML={{__html: text.purpose.body}}/>
                    </div>
                    {/* @ts-ignore */}
                    <div className='fund-section_container--grid-item'>
                        <h2 className='heading-2 heading-2--icon'>
                            <Group size="3rem" fill="white" className="mr-4"/>
                            <span>{text.meeting.title}</span>
                        </h2>
                        <p className='p--regular' dangerouslySetInnerHTML={{__html: text.meeting.body}}/>
                    </div>
                </div>
                <div className='fund-section_container fund-section_container--grid'>
                    {/* @ts-ignore */}
                    <div className='fund-section_container--grid-item'>
                        <h2 className='heading-2 heading-2--icon'>
                            <Diversity size="3rem" fill="white" className="mr-4"/>
                            <span>{text.application.title}</span>
                        </h2>
                        <p className='p--regular' dangerouslySetInnerHTML={{__html: text.application.body}}/>
                    </div>
                    {/* @ts-ignore */}
                    <div className='fund-section_container--grid-item'>
                        <h2 className='heading-2 heading-2--icon'>
                            <ChartDetailed size="3rem" fill="white" className="mr-4"/>
                            <span>{text.yield.title}</span>
                        </h2>
                        <p className='p--regular' dangerouslySetInnerHTML={{__html: text.yield.body}}/>
                    </div>
                </div>
            </section>
            <section className='page-section--without-gaps fund-section fund-section--highlighted'>
                <div className='fund-section_container fund-board'>
                    <h2 className='heading-2 heading-2--icon'>
                        <Office size="3rem" fill="white" className="heading-2_icon"/>
                        <span>{text.board.title}</span>
                    </h2>
                    <div className='fund-board_intro'>
                        {/* @ts-ignore */}
                        <div className='fund-board_intro-text'>
                            <p className='p--highlighted'>{text.board.intro}</p>
                            <p className='p--regular' dangerouslySetInnerHTML={{__html: text.board.body}}/>
                        </div>
                        <div className='fund-board_intro-picture'>
                            <DecoratedPicture
                                imgUrl={config.url.CDN_URL + '/img/fondet/gruppebilde.jpg'}
                                variant={4}
                                cornerSize={90}
                                width={300}
                                height={220}
                                cover={true}
                            />
                        </div>
                    </div>
                    <h3 className='heading-3'>{text.board.heading1}</h3>
                    <div className='fund-board_members'>
                        {Object.keys(boardMembers).map(key => (
                            <div key={key}>
                                <LogChamp
                                    img={boardMembers[key].img == '' ? 'assets/img/placeholders/portrett_placeholder.svg' : `${config.url.CDN_URL}/img/fondet/${boardMembers[key].img}`}
                                    name={boardMembers[key].name == '' ? boardMembers[key].title : boardMembers[key].name}
                                    position={boardMembers[key].title}
                                    discord={boardMembers[key].dctag}
                                    discordLink={boardMembers[key].dclink}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
