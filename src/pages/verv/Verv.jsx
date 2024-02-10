import VervTabs from './VervTabs'
import {withTranslation} from 'react-i18next';

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
      <section className='verv-section verv-apply'>
        <h2 className='verv-section__heading heading-2' dangerouslySetInnerHTML={{__html: t('apply.title')}} />
        <p className='verv-section__p p--regular' dangerouslySetInnerHTML={{__html: t('apply.body')}} />
        <a className='verv-apply__action standard-button standard-button--primary standard-button--arrow-hover' target='_blank' href='https://forms.gle/nQrJuqo3C9URLRM29'>{t('apply.action')}</a>
      </section>
    </div>
  )
}

export default withTranslation('vervPage')(Verv)
