import dotenv from 'dotenv'

dotenv.config()

const { API_URL, CDN_URL } = process.env
const { version } = require('package.json')

const config = {
    url: {
        MAIN_URL: 'login.no',
        API_URL: API_URL || 'https://workerbee.login.no/api',
        CDN_URL: CDN_URL || "https://cdn.login.no",
        EXAM_URL: 'https://exam.login.no',
        WIKI_URL: 'https://wiki.login.no',
        GITLAB_URL: 'https://gitlab.login.no',
        MAIL_URL: 'kontakt@login.no'
    },
    version
}

export default config
