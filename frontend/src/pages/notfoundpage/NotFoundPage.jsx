import React from 'react';
import { Link } from 'react-router-dom';
import {withTranslation} from "react-i18next";

const NotFoundPage = ({t}) => {
	return (
		<div>
            <br/>
            <br/>
            <br/>
            <h1 style={{textAlign:"center"}}>404</h1>
            <p style={{textAlign:"center"}}>
              {t('msg')}
                <br/>
                <br/>
                <br/>
                <Link to="/">{t('help')}</Link>
            </p>
        </div>
	)
}

export default withTranslation('notfound')(NotFoundPage)

