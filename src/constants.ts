// const prod = {
//     url: {
//         API_URL: process.env.REACT_APP_API_URL,
//         CDN_URL: 'https://cdn.login.no'
//     }
// }

const dev = {
    url: {
        // ntnu network necessary, use vpn
        API_URL: 'http://localhost:8081/api',
        // API_URL: 'https://testapi.login.no/api',
        CDN_URL: 'https://cdn.login.no'
    }
}

const config = dev
// const config = process.env.APP_ENV === 'development' ? dev : prod

export default config
