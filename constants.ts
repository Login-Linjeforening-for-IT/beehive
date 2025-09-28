import packageInfo from './package.json'

const isServer = typeof window === 'undefined'
const requiredEnvironmentVariables = [
    'NEXT_PUBLIC_URI',
    'NEXT_PUBLIC_AUTHENTIK_CLIENT_ID',
    'AUTHENTIK_CLIENT_SECRET',
    'NEXT_PUBLIC_AUTHENTIK_URI',
]

const missingVariables = requiredEnvironmentVariables.filter(
    (key) => !process.env[key]
)

if (isServer && missingVariables.length > 0) {
    throw new Error(
        'Missing essential environment variables:\n' +
            missingVariables
                .map((key) => `${key}: ${process.env[key] || 'undefined'}`)
                .join('\n')
    )
}

const env = Object.fromEntries(
    requiredEnvironmentVariables.map((key) => [key, process.env[key]])
)

const config = {
    url: {
        MAIN_URL: 'login.no',
        API_URL: env.NEXT_PUBLIC_API_URL ?? 'https://workerbee.login.no/api',
        CDN_URL: env.NEXT_PUBLIC_CDN_URL ?? 'https://cdn.login.no',
        EXAM_URL: 'https://exam.login.no',
        WIKI_URL: 'https://wiki.login.no',
        GITLAB_URL: 'https://gitlab.login.no',
        LINKEDIN_URL: 'https://www.linkedin.com/company/linjeforeningen-login/about',
        MAIL_URL: 'kontakt@login.no',
        FACEBOOK_URL: 'https://facebook.com/LogNTNU',
        INSTAGRAM_URL: 'https://www.instagram.com/login_linjeforening/',
        DISCORD_URL: 'https://discord.gg/login-ntnu',
        DISORD_USER_URL: 'https://discord.com/users/',
        TEKKOM_BOT_API_URL: 'https://api.tekkom-bot.login.no/api',
        // TEKKOM_BOT_API_URL: 'http://localhost:8080/api',
        SPOTIFY_IMAGE_API_URL: 'https://i.scdn.co/image',
        DISCORD_AVATARS_API_URL: 'https://cdn.discordapp.com/avatars',
        SPOTIFY_URL: 'https://open.spotify.com/track/',
        SPOTIFY_EMBED_URL: 'https://open.spotify.com/embed/track',
        SPOTIFY_ALBUM_URL: 'https://open.spotify.com/album',
        SPOTIFY_ARTIST_URL: 'https://open.spotify.com/artist'
    },
    auth: {
        LOGIN_URI: `${env.NEXT_PUBLIC_URI}/api/login`,
        REDIRECT_URI: `${env.NEXT_PUBLIC_URI}/api/callback`,
        TOKEN_URI: `${env.NEXT_PUBLIC_URI}/api/token`,
        LOGOUT_URI: `${env.NEXT_PUBLIC_URI}/api/logout`,
    },
    authentik: {
        CLIENT_ID: env.NEXT_PUBLIC_AUTHENTIK_CLIENT_ID,
        CLIENT_SECRET: env.AUTHENTIK_CLIENT_SECRET,
        AUTH_URI: `${env.NEXT_PUBLIC_AUTHENTIK_URI}/application/o/authorize/`,
        TOKEN_URI: `${env.NEXT_PUBLIC_AUTHENTIK_URI}/application/o/token/`,
        USERINFO_URI: `${env.NEXT_PUBLIC_AUTHENTIK_URI}/application/o/userinfo/`,
    },
    version: packageInfo.version
}

export default config
