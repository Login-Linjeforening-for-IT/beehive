import config from '@config'

interface SocialLink {
    name: string
    url: string
    iconClass: string
    hoverColor: string
    gradient?: string
}

const socialLinks: SocialLink[] = [
    {
        name: 'Discord',
        url: config.url.DISCORD_URL,
        iconClass: 'logfont-discord',
        hoverColor: '#6571fd'
    },
    {
        name: 'Instagram',
        url: config.url.INSTAGRAM_URL,
        iconClass: 'logfont-instagram',
        hoverColor: 'transparent',
        gradient: 'bg-[linear-gradient(45deg,#fff695_0%,#fff695_5%,#ff5445_45%,#ff37c0_60%,#3d6dff_90%)] bg-clip-text'
    },
    {
        name: 'Facebook',
        url: config.url.FACEBOOK_URL,
        iconClass: 'logfont-facebook',
        hoverColor: '#2c87ff'
    },
    {
        name: 'LinkedIn',
        url: config.url.LINKEDIN_URL,
        iconClass: 'logfont-linkedin',
        hoverColor: '#1a7bdd'
    },
    {
        name: 'GitHub',
        url: config.url.GITHUB_URL,
        iconClass: 'logfont-github',
        hoverColor: 'white'
    },
    {
        name: 'GitLab',
        url: config.url.GITLAB_URL,
        iconClass: 'logfont-gitlab',
        hoverColor: '#f6492e'
    },
    {
        name: 'Wiki',
        url: config.url.WIKI_URL,
        iconClass: 'logfont-wikijs',
        hoverColor: 'rgb(5,186,243)'
    }
]

export default function SocialLinks() {
    const baseIconStyle = 'leading-8 text-[1.5rem] transition-all duration-200 text-center block text-[var(--color-text-footer)]'

    return (
        <div className='grid justify-between mx-auto mt-20 mb-12 sm:grid-cols-7 grid-cols-3 gap-6 w-fit'>
            {socialLinks.map((link) => (
                <a
                    key={link.name}
                    className='block w-8 h-8 mx-auto'
                    href={link.url}
                    target='_blank'
                    rel='noreferrer'
                    aria-label={`Visit our ${link.name} page`}
                    title={link.name}
                >
                    <i className={`${baseIconStyle} ${link.iconClass} hover:text-[${link.hoverColor}] ${link.gradient || ''}`} />
                </a>
            ))}
        </div>
    )
}
