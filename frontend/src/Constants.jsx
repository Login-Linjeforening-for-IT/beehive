
const prod = {
	url: {
		API_URL: 'https://api.login.no',
		CDN_URL: 'http://cdn.login.no'
	}
};


const dev = {
	url: {
		API_URL: 'http://localhost:4000',
		CDN_URL: 'http://cdn.login.no'
	}
};


export const config = process.env.NODE_ENV === 'development' ? dev : prod;
