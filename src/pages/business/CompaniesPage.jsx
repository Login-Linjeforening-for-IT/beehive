import './CompaniesPage.css';
import Contact from './Contact'
import {withTranslation} from "react-i18next";

const CompaniesPage = ({t}) => {
  return (
    <div className='companies-page page-container'>
      <h1 className='heading-1 heading-1--top-left-corner'>{t('companies.title')}</h1>
      <p className='p--highlighted companies-page__intro'>{t('companies.intro')}</p>
      <div className='companies-page__grid-container'>
        <section>
          <h2 className='companies-section__header heading-2'>
            <i className='companies-section__header-icon material-symbols-sharp'>flowsheet</i>
            <span>{t('companies.bedpres.title')}</span>
          </h2>
          <p className='p--regular'>{t('companies.bedpres.body')}</p>
        </section>
        <section>
          <h2 className='companies-section__header heading-2'>
            <i className='companies-section__header-icon logfont-bedkom'></i>
            <span>{t('companies.cyberdays.title')}</span>
          </h2>
          <p className='p--regular'>{t('companies.cyberdays.body')}</p>
        </section>
        <section>
          <h2 className='companies-section__header heading-2'>
            <i className='companies-section__header-icon logfont-ctfkom'></i>
            <span>{t('companies.ctf.title')}</span>
          </h2>
          <p className='p--regular'>{t('companies.ctf.body')}</p>
        </section>
        <section>
          <h2 className='companies-section__header heading-2'>
            <i className='companies-section__header-icon material-symbols-sharp'>campaign</i>
            <span>{t('companies.profiling.title')}</span>
          </h2>
          <p className='p--regular'>{t('companies.profiling.body')}</p>
        </section>
        <section>
          <h2 className='companies-section__header heading-2'>
            <i className='companies-section__header-icon material-symbols-sharp'>build</i>
            <span>{t('companies.workshop.title')}</span>
          </h2>
          <p className='p--regular'>{t('companies.workshop.body')}</p>
        </section>
      </div>
      <Contact/>
    </div>
  );
}

export default withTranslation('companiesPage')(CompaniesPage);
