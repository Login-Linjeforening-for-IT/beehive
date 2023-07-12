import TabNavItem from '../../components/tabs/TabNavItem'
import TabContent from '../../components/tabs/TabContent'
import EventkomLogo from '../../components/svg/committeelogos/EventkomLogo'
import PrkomLogo from '../../components/svg/committeelogos/PrkomLogo'
import TekkomLogo from '../../components/svg/committeelogos/TekkomLogo'
import CtfkomLogo from '../../components/svg/committeelogos/CtfkomLogo'
import StyretLogo from '../../components/svg/committeelogos/StyretLogo'
import SatkomLogo from '../../components/svg/committeelogos/SatkomLogo'
import LogChamp from '../../components/logchamp/LogChamp'
import {config} from '../../Constants';

import {useState} from 'react'
import {withTranslation} from 'react-i18next'

import '../../components/tabs/Tabs.css'
import './VervTabs.css'


const VervTabs = ({t}) => {
  const [activeTab, setActiveTab] = useState('event')

  return (
    <div className='tabs committees'>
      <ul className='tabs__nav'>
        <TabNavItem title={<EventkomLogo/>} id='event' activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TabNavItem title={<TekkomLogo/>} id='tek' activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TabNavItem title={<PrkomLogo/>} id='pr' activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TabNavItem title={<CtfkomLogo/>} id='ctf' activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TabNavItem title={<SatkomLogo/>} id='sat' activeTab={activeTab} setActiveTab={setActiveTab}/>
      </ul>
      <TabContent id='event' activeTab={activeTab}>
        <h3 className='committees__heading heading-3'>
          <i class='logfont-eventkom'></i> {t('committeeSection.eventkom.title')}
        </h3>
        <div className='committees__info'>
          <div className='committees__text'>
            <p className='p--highlighted'>{t('committeeSection.eventkom.intro')}</p>
            <p className='p--regular' dangerouslySetInnerHTML={{__html: t('committeeSection.eventkom.body')}} />
          </div>
          <LogChamp
            img={config.url.CDN_URL + '/img/portraits/portrett_eventkom-leder.jpg'}
            name='Sander Tøkje Hauge'
            stilling={t('committeeSection.board.eventkom')}
            discord='Sandiss#5586'
          />
        </div>
      </TabContent>
      <TabContent id='tek' activeTab={activeTab}>
        <h3 className='committees__heading heading-3'>
          <i class='logfont-tekkom'></i> {t('committeeSection.tekkom.title')}
        </h3>
        <div className='committees__info'>
          <div className='committees__text'>
            <p className='p--highlighted'>{t('committeeSection.tekkom.intro')}</p>
            <p className='p--regular'>{t('committeeSection.tekkom.body')}</p>
          </div>
          <LogChamp
            img={config.url.CDN_URL + '/img/portraits/portrett_tekkom-leder.jpg'}
            name='Eirik Hanasand'
            stilling={t('committeeSection.board.tekkom')}
            discord='Axe#9595'
          />
        </div>
      </TabContent>
      <TabContent id='pr' activeTab={activeTab}>
        <h3 className='committees__heading heading-3'>
          <i class='logfont-pr'></i> {t('committeeSection.pr.title')}
        </h3>
        <div className='committees__info'>
          <div className='committees__text'>
            <p className='p--highlighted'>{t('committeeSection.pr.intro')}</p>
            <p className='p--regular'>{t('committeeSection.pr.body')}</p>
          </div>
          <LogChamp
            img={config.url.CDN_URL + '/img/portraits/portrett_pr-leder.jpg'}
            name='Ida Haavik Førland'
            stilling={t('committeeSection.board.pr')}
            discord='IdaForland#1277'
          />
        </div>
      </TabContent>
      <TabContent id='ctf' activeTab={activeTab}>
        <h3 className='committees__heading heading-3'>
          <i class='logfont-ctfkom'></i> {t('committeeSection.ctfkom.title')}
        </h3>
        <div className='committees__info'>
          <div className='committees__text'>
            <p className='p--highlighted'>{t('committeeSection.ctfkom.intro')}</p>
            <p className='p--regular' dangerouslySetInnerHTML={{__html: t('committeeSection.ctfkom.body')}}/>
          </div>
          <LogChamp
            img={config.url.CDN_URL + '/img/portraits/portrett_ctfkom-leder.jpg'}
            name='Eskil Refsgaard'
            stilling={t('committeeSection.board.ctfkom')}
            discord='ezkill#9067'
          />
        </div>
      </TabContent>
      <TabContent id='sat' activeTab={activeTab}>
        <h3 className='committees__heading heading-3'>
          <i class='logfont-satkom'></i> {t('committeeSection.satkom.title')}
        </h3>
        <div className='committees__info'>
          <div className='committees__text'>
            <p className='p--highlighted' dangerouslySetInnerHTML={{__html: t('committeeSection.satkom.intro')}} />
            <p className='p--regular'>{t('committeeSection.satkom.body')}</p>
          </div>
          <LogChamp
            img={config.url.CDN_URL + '/img/portraits/portrett_økonomi.jpg'}
            name='Trygve Sollund'
            stilling={t('committeeSection.board.satkom')}
            discord='Spikeupine#4356'
          />
        </div>
      </TabContent>
    </div>
  )
}


export default withTranslation('vervPage')(VervTabs)
