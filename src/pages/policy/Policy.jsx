import './Policy.css';
import Contact from './Contact';
import {withTranslation} from "react-i18next";

const Policy = ({t}) => {
  return (
    <div className='policy-page'>
      <h1 className='heading-1 heading-1--top-left-corner'>{t('policy.title')}</h1>
      <p className='p--highlighted policy-page__intro'>{t('policy.organization')}</p>
      <div className='policy-page__grid-container'>
        <section>
          <h2 className='policy-section__header heading-2'>
            <i className='policy-section__header-icon material-symbols-sharp'>flowsheet</i>
            <span>{t('policy.about')}</span>
          </h2>
          <p className='p--regular'>{t('policy.aboutDescription')}</p>
        </section>
        <section>
          <h2 className='policy-section__header heading-2'>
            <span>{t('policy.intro')}</span>
          </h2>
          <p className='p--regular'>{t('policy.introDescription')}</p>
        </section>
        <section>
          <h2 className='policy-section__header heading-2'>
            <span>{t('policy.collection')}</span>
          </h2>
          <p className='p--regular'>{t('policy.collectionDescription')}</p>
        </section>
        <section>
          <h2 className='policy-section__header heading-2'>
            <span>{t('policy.utalization')}</span>
          </h2>
          <p className='p--regular'>{t('policy.utalizationDescription')}</p>
        </section>
        <section>
          <h2 className='policy-section__header heading-2'>
            <span>{t('policy.security')}</span>
          </h2>
          <p className='p--regular'>{t('policy.securityDescription')}</p>
        </section>
        <section>
          <h2 className='policy-section__header heading-2'>
            <span>{t('policy.nondis')}</span>
          </h2>
          <p className='p--regular'>{t('policy.nondisDescription')}</p>
          <p className='p--regular'>{t('policy.transparency')}</p>
        </section>
        <section>
          <h2 className='policy-section__header heading-2'>
            <span>{t('policy.updates')}</span>
          </h2>
          <p className='p--regular'>{t('policy.updatesDescription')}</p>
        </section>
        <section>
          <h2 className='policy-section__header heading-2'>
            <span>{t('policy.contact')}</span>
          </h2>
          <p className='p--regular'>{t('policy.contactDescription')}</p>
          <p className='p--regular'>{t('policy.download')}</p>
        </section>
      </div>
      <Contact/>
    </div>
  );
}

export default withTranslation('policy')(Policy);
