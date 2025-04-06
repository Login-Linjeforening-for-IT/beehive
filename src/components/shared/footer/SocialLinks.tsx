import config from '@config'
import './SocialLinks.css'

export default function SocialLinks() {
    return (
    // @ts-ignore
        <div className='footer-social-links' target='_blank' rel='noreferrer'>
            <a
                className='footer-social-links_link'
                title='Discord'
                href={config.url.DISCORD_URL}
                target='_blank'
                rel='noreferrer'
            >
                <i className='footer-social-links_icon footer-social-links_icon--discord logfont-discord' />
            </a>
            <a
                className='footer-social-links_link'
                title='Instagram'
                href={config.url.INSTAGRAM_URL}
                target='_blank'
                rel='noreferrer'
            >
                <i className='footer-social-links_icon footer-social-links_icon--instagram logfont-instagram' />
            </a>
            <a
                className='footer-social-links_link'
                title='Facebook'
                href={config.url.FACEBOOK_URL}
                target='_blank'
                rel='noreferrer'
            >
                <i className='footer-social-links_icon footer-social-links_icon--facebook logfont-facebook' />
            </a>
            <a
                className='footer-social-links_link'
                title='Linkedin'
                href={config.url.LINKEDIN_URL}
                target='_blank'
                rel='noreferrer'
            >
                <i className='footer-social-links_icon footer-social-links_icon--linkedin logfont-linkedin' />
            </a>
            <a
                className='footer-social-links_link'
                title='Gitlab'
                href={config.url.GITLAB_URL}
                target='_blank'
                rel='noreferrer'
            >
                <i className='footer-social-links_icon footer-social-links_icon--gitlab logfont-gitlab' />
            </a>
            <a
                className='footer-social-links_link'
                title='Wiki'
                href={config.url.WIKI_URL}
                target='_blank'
                rel='noreferrer'
            >
                <i className='footer-social-links_icon footer-social-links_icon--wikijs logfont-wikijs' />
            </a>
        </div>
    )
}
