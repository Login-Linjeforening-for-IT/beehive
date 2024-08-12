import {
  Link,
  useNavigate,
} from 'react-router-dom';
import {withTranslation} from 'react-i18next';
import { config } from '../../Constants';
import './NotFoundPage.css';

const NotFoundPage = ({t}) => {

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
          <Link className='not-found__link standard-link standard-link--corner-hover' onClick={() => navigate(-1)}>{t('help')}</Link>
        </p>
      </div>
    </div>
	)
}

export default withTranslation('notfound')(NotFoundPage)
