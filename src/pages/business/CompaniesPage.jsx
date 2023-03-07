import './CompaniesPage.css';
import Card from '../../components/container/Card';
import Contact from './Contact'
import {withTranslation} from "react-i18next";

const CompaniesPage = ({t}) => {
  return (
    <div className='companies-page page-container'>
      <h1 className='heading-1 heading-1--top-left-corner'>{t('companies.title')}</h1>
      <p className='p--highlighted companies-page__intro'>{t('companies.intro')}</p>
      <div className='companies-page__grid-container'>
        <Card title={t('companies.bedpres.title')} body={t('companies.bedpres.body')}/>
        <Card title={t('companies.cyberdays.title')} body={t('companies.cyberdays.body')}/>
        <Card title={t('companies.ctf.title')} body={t('companies.ctf.body')}/>
        <Card title={t('companies.workshop.title')} body={t('companies.workshop.body')}/>
        <Card title={t('companies.profiling.title')} body={t('companies.profiling.body')}/>
      </div>
      <Contact/>
    </div>
  );
}

export default withTranslation('companiesPage')(CompaniesPage);
