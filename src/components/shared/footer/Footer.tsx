import config from '@config'
import SocialLinks from './SocialLinks'
import no from '@text/layout/no.json'
import en from '@text/layout/en.json'
import './Footer.css'
import Image from 'next/image'
import Link from 'next/link'
import { cookies } from 'next/headers'

export default async function Footer() {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const lang = (await cookies()).get('lang')?.value || 'no'
    const text = lang === 'no' ? no : en

    return (
        <div className='footer-content'>
            <div className='footer-content_logos-conteiner'>
                <div className='footer-content_logo'>
                    <picture className='footer-content_logo-picture'>
                        <Image
                            src={`${config.url.CDN_URL}/img/logo/logo-tekst-white.svg`}
                            className='footer-content_logo-image'
                            alt='Login - Linjeforeningen for IT'
                            width={800}
                            height={200}
                        />
                    </picture>
                </div>
                <div className='footer-content_logo'>
                    <Link href='https://www.mnemonic.io/' target='_blank'>
                        <picture className='footer-content_logo-picture'>
                            <Image
                                src={`${config.url.CDN_URL}/img/company/mnemonic-logo_light-nopayoff-2021.svg`}
                                className='footer-content_logo-image'
                                alt='mnemonic'
                                width={800}
                                height={200}
                            />
                        </picture>
                    </Link>
                    <p className='footer-content_logo-text'>{text.footer.sponsor}</p>
                </div>
            </div>
            <div className='footer-content_contact'>
                <div className='footer-content_contact-section'>
                    <h4 className='footer-content_contact-header'>
                        {text.footer.contactInfo.address.header}
                    </h4>
                    <p className='footer-content_contact-text'>
                        {text.footer.contactInfo.address.info1}
                        <br />
                        {text.footer.contactInfo.address.info2}
                        <br />
                        {text.footer.contactInfo.address.info3}
                    </p>
                </div>
                <div className='footer-content_contact-section'>
                    <h4 className='footer-content_contact-header'>
                        {text.footer.contactInfo.address.header}
                    </h4>
                    <p className='footer-content_contact-text'>
                        <a
                            className='footer-content_contact-link link--underscore-hover'
                            href='mailto:kontakt@login.no'
                        >
                            kontakt@login.no
                        </a>
                    </p>
                </div>
            </div>
            <div className='footer-content_social-links'>
                <SocialLinks />
            </div>
            <div className='footer-content_bottom'>
                <p
                    className='footer-content_bottom-text'
                    dangerouslySetInnerHTML={{
                        __html: ` ${text.footer.copy1} ${currentYear} ${text.footer.copy2}`,
                    }}
                />
                {typeof config.version !== 'undefined' ? (
                    <Link
                        className='footer-content_version-tag'
                        target='_blank'
                        href={`https://gitlab.login.no/tekkom/web/beehive/frontend/-/tags/${config.version}`}
                    >
                        v{config.version}
                    </Link>
                ) : null}
            </div>
        </div>
    )
}
