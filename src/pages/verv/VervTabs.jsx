import TabNavItem from '../../components/tabs/TabNavItem'
import TabContent from '../../components/tabs/TabContent'
import EventkomLogo from '../../components/svg/committeelogos/EventkomLogo'
import BedkomLogo from '../../components/svg/committeelogos/BedkomLogo'
import TekkomLogo from '../../components/svg/committeelogos/TekkomLogo'
import CtfkomLogo from '../../components/svg/committeelogos/CtfkomLogo'
import SatkomLogo from '../../components/svg/committeelogos/SatkomLogo'
import PrLogo from '../../components/svg/committeelogos/PrLogo'
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
        <TabNavItem title={<BedkomLogo/>} id='bedkom' activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TabNavItem title={<CtfkomLogo/>} id='ctf' activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TabNavItem title={<SatkomLogo/>} id='sat' activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TabNavItem title={<PrLogo/>} id='pr' activeTab={activeTab} setActiveTab={setActiveTab}/>
      </ul>
      <TabContent id='event' activeTab={activeTab}>
        <h3 className='committees__heading heading-3'>
          <i className='logfont-eventkom'></i> {t('committeeSection.eventkom.title')}
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
            discordlink='https://discordapp.com/users/171972901501796352'
          />
        </div>
      </TabContent>
      <TabContent id='tek' activeTab={activeTab}>
        <h3 className='committees__heading heading-3'>
          <i className='logfont-tekkom'></i> {t('committeeSection.tekkom.title')}
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
            discordlink='https://discordapp.com/users/376827396764073997'
          />
        </div>
      </TabContent>
      <TabContent id='bedkom' activeTab={activeTab}>
        <h3 className='committees__heading heading-3'>
          <i className='logfont-pr'></i> {t('committeeSection.bedkom.title')}
        </h3>
        <div className='committees__info'>
          <div className='committees__text'>
            <p className='p--highlighted'>{t('committeeSection.bedkom.intro')}</p>
            <p className='p--regular'>{t('committeeSection.bedkom.body')}</p>
          </div>
          <LogChamp
            img={config.url.CDN_URL + '/img/portraits/portrett_bedkom-leder.jpg'}
            name='Ida Haavik Førland'
            stilling={t('committeeSection.board.bedkom')}
            discord='IdaForland#1277'
            discordlink='https://discordapp.com/users/470279697465606159'
          />
        </div>
      </TabContent>
      <TabContent id='ctf' activeTab={activeTab}>
        <h3 className='committees__heading heading-3'>
          <i className='logfont-ctfkom'></i> {t('committeeSection.ctfkom.title')}
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
            discordlink='https://discordapp.com/users/522483274933731331'
          />
        </div>
      </TabContent>
      <TabContent id='sat' activeTab={activeTab}>
        <h3 className='committees__heading heading-3'>
          <i className='logfont-satkom'></i> {t('committeeSection.satkom.title')}
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
            discordlink='https://discordapp.com/users/209395476288634881'
          />
        </div>
      </TabContent>
      <TabContent id='pr' activeTab={activeTab}>
        <h3 className='committees__heading heading-3'>
          {t('committeeSection.pr.title')}
        </h3>
        <div className='committees__info'>
          <div className='committees__text'>
            <p className='p--highlighted' dangerouslySetInnerHTML={{__html: t('committeeSection.pr.intro')}} />
            <p className='p--regular'>{t('committeeSection.pr.body')}</p>
          </div>
          <LogChamp
            img={config.url.CDN_URL + '/img/portraits/portrett_pr-leder.jpg'}
            name='BK'
            stilling={t('committeeSection.board.pr')}
            discord='bk_suup'
            discordlink='https://discordapp.com/users/353992260507140097'
          />
        </div>
      </TabContent>
    </div>
  )
}


export default withTranslation('vervPage')(VervTabs)
