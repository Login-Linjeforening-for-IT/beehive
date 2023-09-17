const prod = {
	url: {
		API_URL: process.env.REACT_APP_API_URL,
		CDN_URL: 'https://cdn.login.no'
	}
};

const dev = {
	url: {
		API_URL: 'http://localhost:8080',
		CDN_URL: 'https://cdn.login.no'
	}
};

//prod.url.API_URL = process.env.REACT_APP_API_URL

export const config = process.env.NODE_ENV === 'development' ? dev : prod
