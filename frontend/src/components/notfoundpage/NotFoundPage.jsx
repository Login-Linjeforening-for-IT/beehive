import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
	return (
		<div>
            <br/>
            <br/>
            <br/>
            <h1 style={{textAlign:"center"}}>404</h1>
            <p style={{textAlign:"center"}}>
                Denne siden finnes ikke...
                <br/>
                <br/>
                <br/>
                <Link to="/">Gå til forsiden </Link>
            </p>
        </div>
	)
}

export default NotFoundPage;