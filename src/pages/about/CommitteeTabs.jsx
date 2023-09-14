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
import './CommitteeTabs.css'


const CommitteeTabs = ({t}) => {
  const [activeTab, setActiveTab] = useState('styret')

  return (
    <div className='tabs committees'>
      <ul className='tabs__nav'>
        <TabNavItem title={<StyretLogo/>} id='styret' activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TabNavItem title={<EventkomLogo/>} id='event' activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TabNavItem title={<TekkomLogo/>} id='tek' activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TabNavItem title={<PrkomLogo/>} id='pr' activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TabNavItem title={<CtfkomLogo/>} id='ctf' activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TabNavItem title={<SatkomLogo/>} id='sat' activeTab={activeTab} setActiveTab={setActiveTab}/>
      </ul>
      <TabContent id='styret' activeTab={activeTab}>
        <div className='board-members'>
          <div className='board-members__intro'>
            <h3 className='committees__heading heading-3'>
              <i className='logfont-styret-filled'></i> {t('committeeSection.board.title')}
            </h3>
            <p className='p--highlighted'>{t('committeeSection.board.body')}</p>
          </div>
          <LogChamp 
            img={config.url.CDN_URL + '/img/portraits/portrett_leder.jpg'}
            name='Tormod Mork Müller'
            stilling={t('committeeSection.board.leader')}
            discord='Backsiide#3129'
            discordlink='https://discordapp.com/users/210124409816612876'
          />
          <LogChamp
            img={config.url.CDN_URL + '/img/portraits/portrett_nestleder.jpg'}
            name='Kristina Kataki'
            stilling={t('committeeSection.board.deputyChairman')}
            discord='Kataki#7254'
            discordlink='https://discordapp.com/users/877108421772582962'
          />
          <LogChamp
            img={config.url.CDN_URL + '/img/portraits/portrett_sekretær.jpg'}
            name='Aleksander Aaboen'
            stilling={t('committeeSection.board.secretary')}
            discord='aleksanderaa#2130'
            discordlink='https://discordapp.com/users/610784035777544202'
          />
          <LogChamp
            img={config.url.CDN_URL + '/img/portraits/portrett_eventkom-leder.jpg'}
            name='Sander Tøkje Hauge'
            stilling={t('committeeSection.board.eventkom')}
            discord='Sandiss#5586'
            discordlink='https://discordapp.com/users/171972901501796352'
          />
          <LogChamp
            img={config.url.CDN_URL + '/img/portraits/portrett_pr-leder.jpg'}
            name='Ida Haavik Førland'
            stilling={t('committeeSection.board.pr')}
            discord='IdaForland#1277'
            discordlink='https://discordapp.com/users/470279697465606159'
          />
          <LogChamp
            img={config.url.CDN_URL + '/img/portraits/portrett_tekkom-leder.jpg'}
            name='Eirik Hanasand'
            stilling={t('committeeSection.board.tekkom')}
            discord='Axe#9595'
            discordlink='https://discordapp.com/users/376827396764073997'
          />
          <LogChamp
            img={config.url.CDN_URL + '/img/portraits/portrett_ctfkom-leder.jpg'}
            name='Eskil Refsgaard'
            stilling={t('committeeSection.board.ctfkom')}
            discord='ezkill#9067'
            discordlink='https://discordapp.com/users/522483274933731331'
          />
          <LogChamp
            img={config.url.CDN_URL + '/img/portraits/portrett_økonomi.jpg'}
            name='Trygve Sollund'
            stilling={t('committeeSection.board.satkom')}
            discord='Spikeupine#4356'
            discordlink='https://discordapp.com/users/209395476288634881'
          />
        </div>
      </TabContent>
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
      <TabContent id='pr' activeTab={activeTab}>
        <h3 className='committees__heading heading-3'>
          <i className='logfont-pr'></i> {t('committeeSection.pr.title')}
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
          <i className='logfont-satkom-filled'></i> {t('committeeSection.satkom.title')}
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
    </div>
  )
}


export default withTranslation('aboutPage')(CommitteeTabs)
