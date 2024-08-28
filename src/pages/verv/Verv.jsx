import VervTabs from './VervTabs'
import {withTranslation} from 'react-i18next';
import './Verv.css'
import ImageCarousel from '../../components/imagecarousel/ImageCarousel'

const Verv = ({t}) => {

  const slides = [];

  for (let i = 1; i <= 15; i++) {
    slides.push({
      imgSrc: `https://cdn.login.no/img/imagecarousel/${i}.jpg`,
      title: t(`imageCarousel.${i}.title`),
      description: t(`imageCarousel.${i}.description`)
    });
  }

  return (
    <div className='verv-page page-container'>
      <div className='page-section--normal'>
        <h1 className='heading-1 heading-1--top-left-corner'>{t('title')}</h1>
      </div>
      <section className='verv-page__section verv-intro page-section--normal'>
        <p className='verv-intro__p p--highlighted' dangerouslySetInnerHTML={{__html: t('intro')}}/>
        <p className='verv-intro__p p--regular' dangerouslySetInnerHTML={{__html: t('intro2')}}/>
      </section>
      <section className='verv-page__section page-section--full-width'>
       <ImageCarousel slides={slides}/>
      </section>
      <section className='verv-committees page-section--normal'>
        <h2 className='heading-2'>{t('committeeSection.title')}</h2>
        <p className='p--regular'>{t('committeeSection.intro')}</p>
      </section>
      <VervTabs/>
      <section className='verv-page__section verv-apply page-section--normal'>
        <h2 className='heading-2' dangerouslySetInnerHTML={{__html: t('apply.title')}} />
        <p className='p--regular' dangerouslySetInnerHTML={{__html: t('apply.body')}} />
        <a className='verv-apply__button standard-button standard-button--primary standard-button--arrow-hover' target='_blank' href='https://forms.gle/nQrJuqo3C9URLRM29'>{t('apply.action')}</a>
      </section>
    </div>
  )
}

export default withTranslation('vervPage')(Verv)
