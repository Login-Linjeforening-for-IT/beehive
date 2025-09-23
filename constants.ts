const { NEXT_PUBLIC_API_URL, NEXT_PUBLIC_CDN_URL } = process.env
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { version } = require('package.json')

const config = {
    url: {
        MAIN_URL: 'login.no',
        API_URL: NEXT_PUBLIC_API_URL ?? 'https://workerbee.login.no/api',
        CDN_URL: NEXT_PUBLIC_CDN_URL ?? 'https://cdn.login.no',
        EXAM_URL: 'https://exam.login.no',
        WIKI_URL: 'https://wiki.login.no',
        GITLAB_URL: 'https://gitlab.login.no',
        LINKEDIN_URL: 'https://www.linkedin.com/company/linjeforeningen-login/about',
        MAIL_URL: 'kontakt@login.no',
        FACEBOOK_URL: 'https://facebook.com/LogNTNU',
        INSTAGRAM_URL: 'https://www.instagram.com/login_linjeforening/',
        DISCORD_URL: 'https://discord.gg/login-ntnu',
        TEKKOM_BOT_API_URL: 'https://api.tekkom-bot.login.no/api',
        // TEKKOM_BOT_API_URL: 'http://localhost:8080/api',
        SPOTIFY_IMAGE_API_URL: 'https://i.scdn.co/image',
        DISCORD_AVATARS_API_URL: 'https://cdn.discordapp.com/avatars',
        SPOTIFY_URL: 'https://open.spotify.com/track/'
    },
    version
}

export default config
