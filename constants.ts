import dotenv from 'dotenv'

dotenv.config()

const { API_URL, CDN_URL } = process.env
const { version } = require('package.json')

const prod = {
    url: {
        API_URL,
        CDN_URL
    },
    version
}

// const dev = {
//     url: {
//         // ntnu network necessary, use vpn
//         API_URL,
//         CDN_URL
//     },
//     version
// }

// const config = {
//     url: {
//         API_URL: "https://workerbee.login.no/api",
//         CDN_URL: "https://cdn.login.no"
//     },
//     version
// }

const config = prod

export default config
