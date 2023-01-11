import React from 'react';
import { Link } from 'react-router-dom';
import {withTranslation} from "react-i18next";
import { config } from '../../Constants';
import './NotFoundPage.css';

const NotFoundPage = ({t}) => {
	return (
		<div className="NotFound">
            <h1>{t('header-1')}</h1>
            <picture className="Picture-Pizza">
              <source srcSet={config.url.CDN_URL + '/img/pizza404.png'} />
              <img alt='Hangry 404'/>
            </picture>
            <h1>{t('header-2')}</h1>
            <br></br>
            <p style={{textAlign:"center"}}>
              {t('msg')}
                <br></br>
                <Link to="/">{t('help')}</Link>
            </p>
        </div>
	)
}

export default withTranslation('notfound')(NotFoundPage)
