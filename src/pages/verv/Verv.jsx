import VervTabs from './VervTabs'
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
        <VervTabs/>
      </section>
      <section className='apply-section'>
        <h1 className='apply-title' dangerouslySetInnerHTML={{__html: t('apply.title')}} />
        <p className='apply-body' dangerouslySetInnerHTML={{__html: t('apply.body')}} />
      </section>
    </div>
  )
}

export default withTranslation('vervPage')(Verv)
