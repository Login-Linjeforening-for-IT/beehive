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
          <p className='p--regular'>{t('companies.bedpres.footer1')}<a className='standard-link standard-link--underscore-hover' href='mailto:bedpres@login.no'>bedpres@login.no</a>{t('companies.bedpres.footer2')}</p>
        </section>
        <section>
            <div>
                <h2 className='heading-2'><i className='companies-page__header-icon logfont-bedkom'></i> {t('companies.cyberdays.title')}</h2>
                <p className='p--regular'>{t('companies.cyberdays.body')}</p>
                <p className='p--regular'>{t('companies.cyberdays.footer1')}<a className='standard-link standard-link--underscore-hover' href='mailto:cyberdagene@login.no'>cyberdagene@login.no</a>{t('companies.cyberdays.footer2')}</p>
            </div>
        </section>
        <section>
            <h2 className='heading-2'><i className='companies-page__header-icon logfont-ctfkom'></i> {t('companies.ctf.title')}</h2>
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
