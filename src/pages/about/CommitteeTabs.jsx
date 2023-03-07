import TabNavItem from '../../components/tabs/TabNavItem'
import TabContent from '../../components/tabs/TabContent'
import EventkomLogo from '../../assets/svg/logos/EventkomLogo'
import PrkomLogo from '../../assets/svg/logos/PrkomLogo'
import TekkomLogo from '../../assets/svg/logos/TekkomLogo'
import CtfkomLogo from '../../assets/svg/logos/CtfkomLogo'
import StyretLogo from '../../assets/svg/logos/StyretLogo'
import SatkomLogo from '../../assets/svg/logos/SatkomLogo'
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
              <h3 className='heading-3' dangerouslySetInnerHTML={{__html: t('committeeSection.board.title')}} />
              <p className='p--regular'>{t('committeeSection.board.body')}</p>
            </div>
            <LogChamp img={config.url.CDN_URL + '/img/portraits/portrett_placeholder.svg'} name='Tormod Mork Müller' stilling={t('committeeSection.board.leader')} discord='Backsiide#3129' />
            <LogChamp img={config.url.CDN_URL + '/img/portraits/portrett_pr-leder.jpg'} name='Kristina Kataki' stilling={t('committeeSection.board.deputyChairman')} discord='Kataki#7254' />
            <LogChamp img={config.url.CDN_URL + '/img/portraits/portrett_placeholder.svg'} name='Aleksander Aaboen' stilling={t('committeeSection.board.secretary')} discord='aleksanderaa#2130' />
            <LogChamp img={config.url.CDN_URL + '/img/portraits/portrett_placeholder.svg'} name='Sander Tøkje Hauge' stilling={t('committeeSection.board.eventkom')} discord='Sandiss#5586' />
            <LogChamp img={config.url.CDN_URL + '/img/portraits/portrett_placeholder.svg'} name='Ida Haavik Førland' stilling={t('committeeSection.board.pr')} discord='IdaForland#1277' />
            <LogChamp img={config.url.CDN_URL + '/img/portraits/portrett_placeholder.svg'} name='Eirik Hanasand' stilling={t('committeeSection.board.tekkom')} discord='Axe#9595' />
            <LogChamp img={config.url.CDN_URL + '/img/portraits/portrett_ctfkom-leder.jpg'} name='Eskil Refsgaard' stilling={t('committeeSection.board.ctfkom')} discord='ezkill#9067' />
            <LogChamp img={config.url.CDN_URL + '/img/portraits/portrett_placeholder.svg'} name='Trygve Sollund' stilling={t('committeeSection.board.satkom')} discord='Spikeupine#4356' />
          </div>
        </TabContent>
        <TabContent id='event' activeTab={activeTab}>
          <h3 className='committees__heading heading-3' dangerouslySetInnerHTML={{__html: t('committeeSection.eventkom.title')}} />
          <div className='committees__info'>
            <div className='committees__text'>
              <p className='p--highlighted'>{t('committeeSection.eventkom.intro')}</p>
              <p className='p--regular' dangerouslySetInnerHTML={{__html: t('committeeSection.eventkom.body')}}/>
            </div>
            <LogChamp img={config.url.CDN_URL + '/img/portraits/portrett_placeholder.svg'} name='Sander Tøkje Hauge' stilling={t('committeeSection.board.eventkom')} discord='Sandiss#5586' />
          </div>
        </TabContent>
        <TabContent id='tek' activeTab={activeTab}>
          <h3 className='committees__heading heading-3' dangerouslySetInnerHTML={{__html: t('committeeSection.tekkom.title')}} />
          <div className='committees__info'>
            <div className='committees__text'>
              <p className='p--highlighted'>{t('committeeSection.tekkom.intro')}</p>
              <p className='p--regular'>{t('committeeSection.tekkom.body')}</p>
            </div>
            <LogChamp img={config.url.CDN_URL + '/img/portraits/portrett_placeholder.svg'} name='Eirik Hanasand' stilling={t('committeeSection.board.tekkom')} discord='Axe#9595' />
          </div>
        </TabContent>
        <TabContent id='pr' activeTab={activeTab}>
          <h3 className='committees__heading heading-3' dangerouslySetInnerHTML={{__html: t('committeeSection.pr.title')}} />
          <div className='committees__info'>
            <div className='committees__text'>
              <p className='p--highlighted'>{t('committeeSection.pr.intro')}</p>
              <p className='p--regular'>{t('committeeSection.pr.body')}</p>
            </div>
            <LogChamp img={config.url.CDN_URL + '/img/portraits/portrett_placeholder.svg'} name='Ida Haavik Førland' stilling={t('committeeSection.board.pr')} discord='IdaForland#1277' />
          </div>
        </TabContent>
        <TabContent id='ctf' activeTab={activeTab}>
          <h3 className='committees__heading heading-3' dangerouslySetInnerHTML={{__html: t('committeeSection.ctfkom.title')}} />
          <div className='committees__info'>
            <div className='committees__text'>
              <p className='p--highlighted'>{t('committeeSection.ctfkom.intro')}</p>
              <p className='p--regular' dangerouslySetInnerHTML={{__html: t('committeeSection.ctfkom.body')}} />
            </div>
            <LogChamp img={config.url.CDN_URL + '/img/portraits/portrett_ctfkom-leder.jpg'} name='Eskil Refsgaard' stilling={t('committeeSection.board.ctfkom')} discord='ezkill#9067' />
          </div>
        </TabContent>
        <TabContent id='sat' activeTab={activeTab}>
          <h3 className='committees__heading heading-3' dangerouslySetInnerHTML={{__html: t('committeeSection.satkom.title')}} />
          <div className='committees__info'>
            <div className='committees__text'>
              <p className='p--highlighted' dangerouslySetInnerHTML={{__html: t('committeeSection.satkom.intro')}} />
              <p className='p--regular' dangerouslySetInnerHTML={{__html: t('committeeSection.satkom.body')}} />
            </div>
            <LogChamp img={config.url.CDN_URL + '/img/portraits/portrett_placeholder.svg'} name='Trygve Sollund' stilling={t('committeeSection.board.satkom')} discord='Spikeupine#4356' />
          </div>
        </TabContent>
      </div>
    </div>
  )
}

export default withTranslation('aboutPage')(CommitteeTabs)
