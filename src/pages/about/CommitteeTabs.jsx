import TabNavItem from '../../components/tabs/TabNavItem'
import TabContent from '../../components/tabs/TabContent'
import EventkomLogo from '../../components/svg/committeelogos/EventkomLogo'
import PrkomLogo from '../../components/svg/committeelogos/PrkomLogo'
import TekkomLogo from '../../components/svg/committeelogos/TekkomLogo'
import CtfkomLogo from '../../components/svg/committeelogos/CtfkomLogo'
import StyretLogo from '../../components/svg/committeelogos/StyretLogo'
import SatkomLogo from '../../components/svg/committeelogos/SatkomLogo'
import LogChamp from '../../components/logchamp/LogChamp'
import { config } from '../../Constants';

import { useState } from 'react'
import {withTranslation} from 'react-i18next'

import '../../components/tabs/Tabs.css'
import './CommitteeTabs.css'


const CommitteeTabs = ({t}) => {
  const [activeTab, setActiveTab] = useState('styret')
 
  return (
    <div className='tabs committees'>
      <ul className='tabs__nav'>
        <TabNavItem title={<StyretLogo />} id='styret' activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TabNavItem title={<EventkomLogo />} id='event' activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TabNavItem title={<TekkomLogo />} id='tek' activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TabNavItem title={<PrkomLogo />} id='pr' activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TabNavItem title={<CtfkomLogo />} id='ctf' activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TabNavItem title={<SatkomLogo />} id='sat' activeTab={activeTab} setActiveTab={setActiveTab}/>
      </ul>
 
      <div>
        <TabContent id='styret' activeTab={activeTab}>
          <div className='board-members'>
            <div className='board-members__intro'>
              <h3 className='committees__heading heading-3'><i class='logfont-styret-filled'></i> {t('committeeSection.board.title')}</h3>
              <p className='p--highlighted'>{t('committeeSection.board.body')}</p>
            </div>
            <LogChamp img={config.url.CDN_URL + '/img/portraits/portrett_leder.jpg'} name='Anders Eiken' stilling={t('committeeSection.board.leader')} discord='Eiken#6059' />
            <LogChamp img={config.url.CDN_URL + '/img/portraits/portrett_nestleder.jpg'} name='Mads Halland' stilling={t('committeeSection.board.deputyChairman')} discord='¬.¬#6719' />
            <LogChamp img={config.url.CDN_URL + '/img/portraits/portrett_sekretær.jpg'} name='Celina Brynildsen' stilling={t('committeeSection.board.secretary')} discord='Celina#6955' />
            <LogChamp img={config.url.CDN_URL + '/img/portraits/portrett_eventkom-leder.jpg'} name='Sofie Hagen' stilling={t('committeeSection.board.eventkom')} discord='sofiee#9763' />
            <LogChamp img={config.url.CDN_URL + '/img/portraits/portrett_pr-leder.jpg'} name='Kristina Kataki' stilling={t('committeeSection.board.pr')} discord='Kataki#7254' />
            <LogChamp img={config.url.CDN_URL + '/img/portraits/portrett_tekkom-leder.jpg'} name='Simon Edna' stilling={t('committeeSection.board.tekkom')} discord='Sim#3909' />
            <LogChamp img={config.url.CDN_URL + '/img/portraits/portrett_ctfkom-leder.jpg'} name='Eskil Refsgaard' stilling={t('committeeSection.board.ctfkom')} discord='refsgaard#9067' />
            <LogChamp img={config.url.CDN_URL + '/img/portraits/portrett_økonomi.jpg'} name='Sebastian Hestsveen' stilling={t('committeeSection.board.satkom')} discord='stubbe#8694' />
          </div>
        </TabContent>
        <TabContent id='event' activeTab={activeTab}>
          <h3 className='committees__heading heading-3'><i class='logfont-eventkom'></i> {t('committeeSection.eventkom.title')}</h3>
          <div className='committees__info'>
            <div className='committees__text'>
              <p className='p--highlighted'>{t('committeeSection.eventkom.intro')}</p>
              <p className='p--regular' dangerouslySetInnerHTML={{__html: t('committeeSection.eventkom.body')}}/>
            </div>
            <LogChamp img={config.url.CDN_URL + '/img/portraits/portrett_eventkom-leder.jpg'} name='Sofie Hagen' stilling={t('committeeSection.board.eventkom')} discord='sofiee#9763' />
          </div>
        </TabContent>
        <TabContent id='tek' activeTab={activeTab}>
          <h3 className='committees__heading heading-3'><i class='logfont-tekkom'></i> {t('committeeSection.tekkom.title')}</h3>
          <div className='committees__info'>
            <div className='committees__text'>
              <p className='p--highlighted'>{t('committeeSection.tekkom.intro')}</p>
              <p className='p--regular'>{t('committeeSection.tekkom.body')}</p>
            </div>
            <LogChamp img={config.url.CDN_URL + '/img/portraits/portrett_tekkom-leder.jpg'} name='Simon Edna' stilling={t('committeeSection.board.tekkom')} discord='Sim#3909' />
          </div>
        </TabContent>
        <TabContent id='pr' activeTab={activeTab}>
          <h3 className='committees__heading heading-3'><i class='logfont-pr'></i> {t('committeeSection.pr.title')}</h3>
          <div className='committees__info'>
            <div className='committees__text'>
              <p className='p--highlighted'>{t('committeeSection.pr.intro')}</p>
              <p className='p--regular'>{t('committeeSection.pr.body')}</p>
            </div>
            <LogChamp img={config.url.CDN_URL + '/img/portraits/portrett_pr-leder.jpg'} name='Kristina Kataki' stilling={t('committeeSection.board.pr')} discord='Kataki#7254' />
          </div>
        </TabContent>
        <TabContent id='ctf' activeTab={activeTab}>
          <h3 className='committees__heading heading-3'><i class='logfont-ctfkom'></i> {t('committeeSection.ctfkom.title')}</h3>
          <div className='committees__info'>
            <div className='committees__text'>
              <p className='p--highlighted'>{t('committeeSection.ctfkom.intro')}</p>
              <p className='p--regular' dangerouslySetInnerHTML={{__html: t('committeeSection.ctfkom.body')}} />
            </div>
            <LogChamp img={config.url.CDN_URL + '/img/portraits/portrett_ctfkom-leder.jpg'} name='Eskil Refsgaard' stilling={t('committeeSection.board.ctfkom')} discord='refsgaard#9067' />
          </div>
        </TabContent>
        <TabContent id='sat' activeTab={activeTab}>
          <h3 className='committees__heading heading-3'><i class='logfont-satkom'></i> {t('committeeSection.satkom.title')}</h3>
          <div className='committees__info'>
            <div className='committees__text'>
              <p className='p--highlighted' dangerouslySetInnerHTML={{__html: t('committeeSection.satkom.intro')}} />
              <p className='p--regular'>{t('committeeSection.satkom.body')}</p>
            </div>
            <LogChamp img={config.url.CDN_URL + '/img/portraits/portrett_økonomi.jpg'} name='Sebastian Hestsveen' stilling={t('committeeSection.board.satkom')} discord='stubbe#8694' />
          </div>
        </TabContent>
      </div>
    </div>
  )
}

export default withTranslation('aboutPage')(CommitteeTabs)
