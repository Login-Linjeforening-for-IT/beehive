import dotenv from 'dotenv'

dotenv.config()

const { API_URL, CDN_URL, APP_ENV } = process.env
const { version } = require('package.json')

console.log("fetched from env", API_URL, CDN_URL)

const prod = {
    url: {
        API_URL,
        CDN_URL
    },
    version
}

const dev = {
    url: {
        // ntnu network necessary, use vpn
        API_URL,
        CDN_URL
    },
    version
}

const config = APP_ENV === 'development' ? dev : prod

export default config
