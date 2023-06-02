import CommitteeTabs from './CommitteeTabs'
import StudyProgramsAcordion from './StudyProgramsAccordion'
import DecoratedPicture from '../../components/picture/DecoratedPicture'
import {withTranslation} from 'react-i18next';
import { config } from '../../Constants';

import './Verv.css'
import ImageCarousel from './imageCarousel';

const Verv = ({t}) => {
  return (
    <div className='verv-page page-container'>
      <h1 className='heading-1 heading-1--top-left-corner'>{t('title')}</h1>
      <section className='verv-section verv-intro'>
        <p className='verv-intro__p verv-section__p p--highlighted' dangerouslySetInnerHTML={{__html: t('intro')}}/>
        <ImageCarousel/>
      </section>
      <section className='verv-section verv-committees'>
        <h2 className='verv-section__heading heading-2'>{t('committeeSection.title')}</h2>
        <p className='verv-section__p p--regular'>{t('committeeSection.intro')}</p>
        <CommitteeTabs/>
      </section>
      <section className='verv-section verv-public-docs'>
        <h2 className='verv-section__heading heading-2'>{t('publicDocs.title')}</h2>
        <p className='verv-section__p p--regular' dangerouslySetInnerHTML={{__html: t('publicDocs.body')}}/>
        <ul className='verv-public-docs__list ul--regular'>
          <li>{t('publicDocs.bulletPoints.agendas')}</li>
          <li>{t('publicDocs.bulletPoints.minutes')}</li>
          <li>{t('publicDocs.bulletPoints.budgets')}</li>
          <li>{t('publicDocs.bulletPoints.honorary-member')}</li>
          <li>{t('publicDocs.bulletPoints.bylaws')}</li>
        </ul>
      </section>
    </div>
  )
}

export default withTranslation('vervPage')(Verv)
