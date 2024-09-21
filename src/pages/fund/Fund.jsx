import { withTranslation } from "react-i18next"
import LogChamp from '../../components/logchamp/LogChamp'
import board from '../../assets/boardmembers/fundBoardMembers.json'
import placholder from '../../assets/img/placeholders/portrett_placeholder.svg'
import DecoratedPicture from '../../components/images/decoratedpicture/DecoratedPicture'
import { config } from '../../Constants'


import './Fund.css'

const Fund = ({t, i18n}) => {

    const useEng = i18n.language === 'en';

    return (
        <div className='page-container'>
            <div className="page-section--normal">
            <h1 className='heading-1 heading-1--top-left-corner'>{t('title')}</h1>
            <section className='fund-section'>
                <div>
                    <p className='p--highlighted'>{t('intro')}</p>
                </div>
            </section>
            <section className='fund-section fund-section--highlighted'>
                <div className='fund-section__container--highlighted'>
                    <h2 className='heading-2'>{t('support.title')}</h2>
                    <p className='p--highlighted' dangerouslySetInnerHTML={{__html: t('support.intro')}}/>
                    <p className='p--regular' dangerouslySetInnerHTML={{__html: t('support.body')}}/>
                </div>
            </section>
            <section className='fund-section'>
                <div className='fund-section__container fund-section__container--grid'>
                    <div class='fund-section__container--grid-item'>
                        <h2 className='fund-section__header heading-2'>
                            <i className='fund-section__header-icon material-symbols-sharp'>show_chart</i>
                            <span>{t('purpose.title')}</span>
                        </h2>
                        <p className='p--regular' dangerouslySetInnerHTML={{__html: t('purpose.body')}}/>
                    </div>
                    <div class='fund-section__container--grid-item'>
                        <h2 className='fund-section__header heading-2'>
                            <i className='fund-section__header-icon material-symbols-sharp'>groups</i>
                            <span>{t('meeting.title')}</span>
                        </h2>
                        <p className='p--regular' dangerouslySetInnerHTML={{__html: t('meeting.body')}}/>
                    </div>
                    </div>
                    <div className='fund-section__container fund-section__container--grid'>
                    <div class='fund-section__container--grid-item'>
                        <h2 className='fund-section__header heading-2'>
                            <i className='fund-section__header-icon material-symbols-sharp'>diversity_1</i>
                            <span>{t('application.title')}</span>
                        </h2>
                        <p className='p--regular' dangerouslySetInnerHTML={{__html: t('application.body')}}/>
                    </div>
                    <div class='fund-section__container--grid-item'>
                        <h2 className='fund-section__header heading-2'>
                            <i className='fund-section__header-icon material-symbols-sharp'>monitoring</i>
                            <span>{t('yield.title')}</span>
                        </h2>
                        <p className='p--regular' dangerouslySetInnerHTML={{__html: t('yield.body')}}/>
                    </div>
                </div>
            </section>
            <section className='fund-section fund-section--highlighted'>
                <div className='fund-section__container fund-section__container--highlighted fund-board'>
                    <h2 className='fund-section__header heading-2'>
                        <i className='fund-section__header-icon material-symbols-sharp'>corporate_fare</i>
                        <span>{t('board.title')}</span>
                    </h2>
                    <div className='fund-board__intro'>
                        <div class='fund-board__intro-text'>
                            <p className='p--highlighted'>{t('board.intro')}</p>
                            <p className='p--regular' dangerouslySetInnerHTML={{__html: t('board.body')}}/>
                        </div>
                        <div className='fund-board__intro-picture'>
                            <DecoratedPicture
                                imgurl={config.url.CDN_URL + '/img/fondet/gruppebilde.jpg'}
                                decorationNr={4}
                                cornerSize={400}
                                w={1285}
                                h={945}
                            />
                        </div>
                    </div>
                </div>
                </section>
                <section className='fund-section'>
                <div className='fund-section__container fund-board'>
                    <h3 className='heading-3'>{t('board.composition.title')}</h3>
                    <div className='fund-board__members'>
                        {Object.keys(board).map(key => (
                            <div>
                                <LogChamp
                                    key={key}
                                    img={board[key].img == '' ? placholder : config.url.CDN_URL + '/img/fondet/' + board[key].img}
                                    name={board[key].name == '' ? t('board.composition.placeholder') : board[key].name}
                                    stilling={useEng ? board[key].title_en : board[key].title_no}
                                    discord={board[key].dctag}
                                    discordlink={board[key].dclink}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            </div>
        </div>
    )
}


export default withTranslation('fundPage')(Fund)