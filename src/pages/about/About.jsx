import CommitteeTabs from './CommitteeTabs'
import StudyProgramsAcordion from './StudyProgramsAccordion'
import DecoratedPicture from '../../components/picture/DecoratedPicture'
import {withTranslation} from "react-i18next";
import { config } from '../../Constants';

import './About.css'

const About = ({t}) => {
  return (
    <div className='about-page page-container'>
      <h1 className='heading-1 heading-1--bottom-left-corner heading-1--top-right-corner'>{t('title')}</h1>
      <section className='about-section about-intro'>
        <p className='about-intro__p about-section__p p--highlighted' dangerouslySetInnerHTML={{__html: t('intro')}}/>
        <div className='about-intro__grid-container'>
          <StudyProgramsAcordion/>
          <DecoratedPicture imgurl={config.url.CDN_URL + '/img/styret2.jpg'} decorationNr={3} cornerSize={400} w={1420} h={947} />
        </div>
      </section>
      <section className='about-section'>
        <h2 className='about-section__heading heading-2'>{t('about.title')}</h2>
        <div className='p--columes'>
          <p className='about-section__p p--highlighted' dangerouslySetInnerHTML={{__html: t('about.intro')}}/>
          <p className='about-section__p p--regular' dangerouslySetInnerHTML={{__html: t('about.body.p1')}}/>
          <p className='about-section__p p--regular' dangerouslySetInnerHTML={{__html: t('about.body.p2')}}/>
        </div>
      </section>
      <section className='about-section about-committees'>
        <h2 className='about-section__heading heading-2'>{t('committeeSection.title')}</h2>
        <p className='about-section__p p--regular'>{t('committeeSection.intro')}</p>
        <CommitteeTabs/>
      </section>
      <section className='about-public-docs-section'>
        <h2 className='about-section__heading heading-2'>{t('publicDocs.title')}</h2>
        <p className='about-section__p p--wide' dangerouslySetInnerHTML={{__html: t('publicDocs.body')}}/>
        <div className='about-public-docs '>
          <ul>
            <li className='p--short'>{t('publicDocs.bulletPoints.agendas')}</li>
            <li className='p--short'>{t('publicDocs.bulletPoints.minutes')}</li>
            <li className='p--short'>{t('publicDocs.bulletPoints.budgets')}</li>
            <li className='p--short'>{t('publicDocs.bulletPoints.honorary-member')}</li>
            <li className='p--short'>{t('publicDocs.bulletPoints.bylaws')}</li>
          </ul>
        </div>
      </section>
    </div>
  )
}

export default withTranslation('aboutPage')(About)
