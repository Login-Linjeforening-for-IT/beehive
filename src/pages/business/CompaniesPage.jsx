import './CompaniesPage.css';
import Contact from './Contact'
import {withTranslation} from "react-i18next";

const CompaniesPage = ({t}) => {
  return (
    <div className='companies-page page-container'>
      <h1 className='heading-1 heading-1--top-left-corner'>{t('companies.title')}</h1>
      <p className='p--highlighted companies-page__intro'>{t('companies.intro')}</p>
      <div className='companies-page__grid-container'>
        <div>
          <h2 className='heading-2'><i className='companies-page__header-icon material-symbols-sharp'>flowsheet</i> {t('companies.bedpres.title')}</h2>
          <p className='p--regular'>{t('companies.bedpres.body')}</p>
        </div>
        <div>
          <h2 className='heading-2'><i className='companies-page__header-icon logfont-pr'></i> {t('companies.cyberdays.title')}</h2>
          <p className='p--regular'>{t('companies.cyberdays.body')}</p>
        </div>
        <div>
          <h2 className='heading-2'><i className='companies-page__header-icon logfont-ctfkom'></i> {t('companies.ctf.title')}</h2>
          <p className='p--regular'>{t('companies.ctf.body')}</p>
        </div>
        <div>
          <h2 className='heading-2'><i className='companies-page__header-icon material-symbols-sharp'>build</i> {t('companies.workshop.title')}</h2>
          <p className='p--regular'>{t('companies.workshop.body')}</p>
        </div>
        <div>
          <h2 className='heading-2'><i className='companies-page__header-icon material-symbols-sharp'>campaign</i> {t('companies.profiling.title')}</h2>
          <p className='p--regular'>{t('companies.profiling.body')}</p>
        </div>
      </div>
      <Contact/>
    </div>
  );
}

export default withTranslation('companiesPage')(CompaniesPage);
