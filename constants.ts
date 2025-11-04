import packageInfo from './package.json'

const { env } = process

const config = {
    url: {
        MAIN_URL: 'login.no',
        API_URL: env.NEXT_PUBLIC_API_URL ?? 'https://workerbee-v2.login.no/api',
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
        BASE_URL: env.BASE_URL,
        LOGIN_URL: `${env.BASE_URL}/api/login`,
        REDIRECT_URL: `${env.BASE_URL}/api/callback`,
        TOKEN_URL: `${env.BASE_URL}/api/token`,
        LOGOUT_URL: `${env.BASE_URL}/api/logout`,
    },
    authentik: {
        CLIENT_ID: env.AUTHENTIK_CLIENT_ID,
        CLIENT_SECRET: env.AUTHENTIK_CLIENT_SECRET,
        AUTH_URL: `${env.AUTHENTIK_URL}/application/o/authorize/`,
        TOKEN_URL: `${env.AUTHENTIK_URL}/application/o/token/`,
        USERINFO_URL: `${env.AUTHENTIK_URL}/application/o/userinfo/`,
    },
    version: packageInfo.version
}

export default config

