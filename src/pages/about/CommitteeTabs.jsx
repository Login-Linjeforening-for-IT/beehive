import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { config } from '../../Constants';
import board from '../../assets/boardmembers/boardmembers.json';

import TabNavItem from '../../components/tabs/TabNavItem';
import TabContent from '../../components/tabs/TabContent';
import LogChamp from '../../components/logchamp/LogChamp';

import EventkomLogo from '../../components/svg/committeelogos/EventkomLogo';
import BedkomLogo from '../../components/svg/committeelogos/BedkomLogo';
import TekkomLogo from '../../components/svg/committeelogos/TekkomLogo';
import CtfkomLogo from '../../components/svg/committeelogos/CtfkomLogo';
import StyretLogo from '../../components/svg/committeelogos/StyretLogo';
import SatkomLogo from '../../components/svg/committeelogos/SatkomLogo';
import PrLogo from '../../components/svg/committeelogos/PrLogo';

import '../../components/tabs/Tabs.css';
import './CommitteeTabs.css';


const CommitteeTabs = () => {

  const { t, i18n } = useTranslation('aboutPage');
  const useEng = i18n.language === "en";
  const [activeTab, setActiveTab] = useState('styret');

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
              <i className='logfont-styret-filled'></i> {t('committeeSection.board.title')}
            </h3>
            <p className='p--highlighted'>{t('committeeSection.board.body')}</p>
          </div>
          {Object.keys(board).map((key) => (
            <LogChamp
              key={key}
              img={config.url.CDN_URL + '/img/portraits/' + board[key].img}
              name={board[key].name}
              stilling={useEng ? board[key].title_en : board[key].title_no}
              discord={board[key].dctag}
              discordlink={board[key].dclink}
            />
          ))}
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
            img={config.url.CDN_URL + '/img/portraits/' +  board.eventkomLeader.img}
            name={board.eventkomLeader.name}
            stilling={useEng ? board.eventkomLeader.title_en : board.eventkomLeader.title_no}
            discord={board.eventkomLeader.dctag}
            discordlink={board.eventkomLeader.dclink}
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
            img={config.url.CDN_URL + '/img/portraits/' +  board.tekkomLeader.img}
            name={board.tekkomLeader.name}
            stilling={useEng ? board.tekkomLeader.title_en : board.tekkomLeader.title_no}
            discord={board.tekkomLeader.dctag}
            discordlink={board.tekkomLeader.dclink}
          />
        </div>
      </TabContent>
      <TabContent id='bedkom' activeTab={activeTab}>
        <h3 className='committees__heading heading-3'>
          <i className='logfont-bedkom'></i> {t('committeeSection.bedkom.title')}
        </h3>
        <div className='committees__info'>
          <div className='committees__text'>
            <p className='p--highlighted'>{t('committeeSection.bedkom.intro')}</p>
            <p className='p--regular'>{t('committeeSection.bedkom.body')}</p>
          </div>
          <LogChamp 
            img={config.url.CDN_URL + '/img/portraits/' +  board.bedkomLeader.img}
            name={board.bedkomLeader.name}
            stilling={useEng ? board.bedkomLeader.title_en : board.bedkomLeader.title_no}
            discord={board.bedkomLeader.dctag}
            discordlink={board.bedkomLeader.dclink}
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
            img={config.url.CDN_URL + '/img/portraits/' +  board.ctfkomLeader.img}
            name={board.ctfkomLeader.name}
            stilling={useEng ? board.ctfkomLeader.title_en : board.ctfkomLeader.title_no}
            discord={board.ctfkomLeader.dctag}
            discordlink={board.ctfkomLeader.dclink}
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
            img={config.url.CDN_URL + '/img/portraits/' +  board.satkomLeader.img}
            name={board.satkomLeader.name}
            stilling={useEng ? board.satkomLeader.title_en : board.satkomLeader.title_no}
            discord={board.satkomLeader.dctag}
            discordlink={board.satkomLeader.dclink}
          />
        </div>
      </TabContent>
      <TabContent id='pr' activeTab={activeTab}>
        <h3 className='committees__heading heading-3'>
          <i className='logfont-pr'></i> {t('committeeSection.pr.title')}
        </h3>
        <div className='committees__info'>
          <div className='committees__text'>
            <p className='p--highlighted' dangerouslySetInnerHTML={{__html: t('committeeSection.pr.intro')}} />
            <p className='p--regular'>{t('committeeSection.pr.body')}</p>
          </div>
          <LogChamp 
            img={config.url.CDN_URL + '/img/portraits/' +  board.prLeader.img}
            name={board.prLeader.name}
            stilling={useEng ? board.prLeader.title_en : board.prLeader.title_no}
            discord={board.prLeader.dctag}
            discordlink={board.prLeader.dclink}
          />
        </div>
      </TabContent>
    </div>
  )
}

export default CommitteeTabs;
