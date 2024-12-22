'use client'

import config from "@config"
import LogChamp from "@components/shared/logchamp/LogChamp"
import placholder from "@assets/img/placeholders/portrett_placeholder.svg"
import DecoratedPicture from "@components/shared/images/decoratedpicture/DecoratedPicture"
import no from '@text/fund/no.json'
import en from '@text/fund/en.json'
import board_en from '@text/board/no.json'
import board_no from '@text/board/en.json'
import getCookie from "@utils/getCookie"
import "./page.css"

const lang = getCookie('lang') as 'no' | 'en' || 'no'
const text: any = lang === 'en' ? {...en, ...board_en} : {...no, ...board_no}

export default function Fund() {

    const useEng = lang === "en"

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
                <div className='fund-section__container fund-section__container--grid'>
                    {/* @ts-ignore */}
                    <div class='fund-section__container--grid-item'>
                        <h2 className='heading-2 heading-2--icon'>
                            <i className='heading-2__icon material-symbols-sharp'>show_chart</i>
                            <span>{text.purpose.title}</span>
                        </h2>
                        <p className='p--regular' dangerouslySetInnerHTML={{__html: text.purpose.body}}/>
                    </div>
                    {/* @ts-ignore */}
                    <div class='fund-section__container--grid-item'>
                        <h2 className='heading-2 heading-2--icon'>
                            <i className='heading-2__icon material-symbols-sharp'>groups</i>
                            <span>{text.meeting.title}</span>
                        </h2>
                        <p className='p--regular' dangerouslySetInnerHTML={{__html: text.meeting.body}}/>
                    </div>
                </div>
                <div className='fund-section__container fund-section__container--grid'>
                    {/* @ts-ignore */}
                    <div class='fund-section__container--grid-item'>
                        <h2 className='heading-2 heading-2--icon'>
                            <i className='heading-2__icon material-symbols-sharp'>diversity_1</i>
                            <span>{text.application.title}</span>
                        </h2>
                        <p className='p--regular' dangerouslySetInnerHTML={{__html: text.application.body}}/>
                    </div>
                    {/* @ts-ignore */}
                    <div class='fund-section__container--grid-item'>
                        <h2 className='heading-2 heading-2--icon'>
                            <i className='heading-2__icon material-symbols-sharp'>monitoring</i>
                            <span>{text.yield.title}</span>
                        </h2>
                        <p className='p--regular' dangerouslySetInnerHTML={{__html: text.yield.body}}/>
                    </div>
                </div>
            </section>
            <section className='page-section--without-gaps fund-section fund-section--highlighted'>
                <div className='fund-section__container fund-board'>
                    <h2 className='heading-2 heading-2--icon'>
                        <i className='heading-2__icon material-symbols-sharp'>corporate_fare</i>
                        <span>{text.board.title}</span>
                    </h2>
                    <div className='fund-board__intro'>
                        {/* @ts-ignore */}
                        <div class='fund-board__intro-text'>
                            <p className='p--highlighted'>{text.board.intro}</p>
                            <p className='p--regular' dangerouslySetInnerHTML={{__html: text.board.body}}/>
                        </div>
                        <div className='fund-board__intro-picture'>
                            <DecoratedPicture
                                imgUrl={config.url.CDN_URL + "/img/fondet/gruppebilde.jpg"}
                                variant={4}
                                cornerSize={90}
                                width={300}
                                height={220}
                                cover={true}
                            />
                        </div>
                    </div>
                    <h3 className='heading-3'>{text.board.composition.title}</h3>
                    <div className='fund-board__members'>
                        {Object.keys(text).map(key => (
                            <div>
                                <LogChamp
                                    key={key}
                                    img={text[key].img == "" ? placholder : `${config.url.CDN_URL}/img/fondet/${text[key].img}`}
                                    name={text[key].name == "" ? text.board.composition.placeholder : text[key].name}
                                    position={text[key].title}
                                    discord={text[key].dctag}
                                    discordLink={text[key].dclink}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
