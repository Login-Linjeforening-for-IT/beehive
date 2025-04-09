import config from '@config'
import LogChamp from '@components/shared/logchamp/LogChamp'
import DecoratedPicture from '@components/shared/images/decoratedpicture/DecoratedPicture'
import no from '@text/fund/no.json'
import en from '@text/fund/en.json'
import Chart from '@components/svg/symbols/Chart'
import Group from '@components/svg/symbols/Group'
import Diversity from '@components/svg/symbols/Diversity'
import ChartDetailed from '@components/svg/symbols/ChartDetailed'
import Office from '@components/svg/symbols/Office'
import { cookies } from 'next/headers'

export default async function Fund() {
    const lang = (await cookies()).get('lang')?.value || 'no'
    // eslint-disable-next-line
    const text: any = lang === 'en' ? {...en} : {...no}

    const boardMembers = text.board.members
    const boardMemberKeys = Object.keys(boardMembers)
    const actualBoardMembers = Array.isArray(boardMemberKeys) ? boardMemberKeys : []

    return (
        <div className='page-container'>
            <div className='page-section--normal'>
                <h1 className='heading-1 heading-1--top-left-corner'>{text.title}</h1>
            </div>
            <section className='page-section--normal mb-[2rem]'>
                <p className='p--highlighted'>{text.intro}</p>
            </section>
            <section className='page-section--without-gaps mb-[5rem] bg-[var(--color-bg-surface)] p-[1rem] 800px:p-[1rem_2rem_2rem_2rem] 1200px:p-[1rem_3rem_2rem_3rem] 1200px:mx-[2rem] 1200px:rounded-[var(--border-radius-large)]'>
                <h2 className='heading-2'>{text.support.title}</h2>
                <p className='p--highlighted' dangerouslySetInnerHTML={{__html: text.support.intro}}/>
                <h3 className='heading-4'>{text.support.heading1}</h3>
                <p className='p--regular'>{text.support.body1}</p>
                <h3 className='heading-4'>{text.support.heading2}</h3>
                <p className='p--regular'>{text.support.body2}</p>
                <h3 className='heading-4'>{text.support.heading3}</h3>
                <p className='p--regular' dangerouslySetInnerHTML={{__html: text.support.body3}}/>
            </section>
            <section className='page-section--normal mb-[5rem]'>
                <div className='fund-section_container 800px:grid 800px:grid-cols-2 800px:gap-[4rem]'>
                    {/* @ts-ignore */}
                    <div className='fund-section_container--grid-item'>
                        <h2 className='flex flex-row heading-2 heading-2--icon'>
                            <Chart className='w-[3rem] h-[3rem] fill-[var(--color-text-main)] mr-4'/>
                            <span>{text.purpose.title}</span>
                        </h2>
                        <p className='p--regular' dangerouslySetInnerHTML={{__html: text.purpose.body}}/>
                    </div>
                    {/* @ts-ignore */}
                    <div className='fund-section_container--grid-item'>
                        <h2 className='heading-2 heading-2--icon'>
                            <Group className='w-[3rem] h-[3rem] fill-[var(--color-text-main)] mr-4'/>
                            <span>{text.meeting.title}</span>
                        </h2>
                        <p className='p--regular' dangerouslySetInnerHTML={{__html: text.meeting.body}}/>
                    </div>
                </div>
                <div className='fund-section_container 800px:grid 800px:grid-cols-2 800px:gap-[4rem]'>
                    {/* @ts-ignore */}
                    <div className='fund-section_container--grid-item'>
                        <h2 className='heading-2 heading-2--icon'>
                            <Diversity className='w-[3rem] h-[3rem] fill-[var(--color-text-main)] mr-4'/>
                            <span>{text.application.title}</span>
                        </h2>
                        <p className='p--regular' dangerouslySetInnerHTML={{__html: text.application.body}}/>
                    </div>
                    {/* @ts-ignore */}
                    <div className='fund-section_container--grid-item'>
                        <h2 className='heading-2 heading-2--icon'>
                            <ChartDetailed className='w-[3rem] h-[3rem] fill-[var(--color-text-main)] mr-4'/>
                            <span>{text.yield.title}</span>
                        </h2>
                        <p className='p--regular' dangerouslySetInnerHTML={{__html: text.yield.body}}/>
                    </div>
                </div>
            </section>
            <section className='page-section--without-gaps mb-[5rem] bg-[var(--color-bg-surface)] p-[1rem] 800px:p-[1rem_2rem_2rem_2rem] 1200px:p-[1rem_3rem_2rem_3rem] 1200px:mx-[2rem] 1200px:rounded-[var(--border-radius-large)]'>
                <div className='fund-section_container fund-board'>
                    <h2 className='heading-2 heading-2--icon'>
                        <Office className='w-[3rem] h-[3rem] fill-[var(--color-text-main)] heading-2_icon'/>
                        <span>{text.board.title}</span>
                    </h2>
                    <div className='flex flex-wrap justify-center gap-[3rem] mb-[4rem]'>
                        {/* @ts-ignore */}
                        <div className='box-border flex-[1_1_20rem] m-auto'>
                            <p className='p--highlighted'>{text.board.intro}</p>
                            <p className='p--regular' dangerouslySetInnerHTML={{__html: text.board.body}}/>
                        </div>
                        <div className='box-border flex-[1_1_20rem] my-auto max-w-[33rem]'>
                            <DecoratedPicture
                                imgUrl={config.url.CDN_URL}     //fondet group picture here
                                variant={4}
                                cornerSize={90}
                                width={300}
                                height={220}
                                cover={true}
                            />
                        </div>
                    </div>
                    <h3 className='heading-3'>{text.board.heading1}</h3>
                    <div className='flex flex-wrap gap-[2rem] justify-center py-[2rem] 800px:gap-[3rem]'>
                        {actualBoardMembers.map(key => (
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
