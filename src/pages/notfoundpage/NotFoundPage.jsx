import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { config } from '../../Constants';

import Button from '../../components/button/Button';

import './NotFoundPage.css';

const NotFoundPage = () => {

  const { t } = useTranslation('notfound');
  const navigate = useNavigate();

	return (
		<div className='not-found'>
      <picture className='not-found__pic'>
        <source srcSet={config.url.CDN_URL + '/img/pizza404.png'} />
        <img className='not-found__img' alt='Hangry 404'/>
      </picture>
      <div className='not-found__text'>
        <h1>{t('header-1')}</h1>
        <p className='not-found__p p--regular'>
          {t('msg')}
        </p>
        <Button onClick={() => navigate(-1)} leadingIcon={<i className='material-symbols-sharp'>west</i>}>
          {t('help')}
        </Button>
      </div>
    </div>
	)
}

export default NotFoundPage;
