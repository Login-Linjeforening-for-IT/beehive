'use client'

import { useContext } from 'react'
import DecoratedPicture from '@components/shared/images/decoratedpicture/DecoratedPicture'
import AppContext from '@context/context'
import no from '@text/landing/no.json'
import en from '@text/landing/en.json'
import Link from 'next/link'
import config from '@config'

export default function SmallInfo() {
    const { lang, theme } = useContext(AppContext)
    const text = lang === 'en' ? en : no

    function getSponsorPath() {
        if (theme === 'light') {
            return '/img/company/mnemonic-logo_dark-nopayoff-2021.svg'
        } else {
            return '/img/company/mnemonic-logo_light-nopayoff-2021.svg'
        }
    }

    return (
        <>
            <div className='landing-info'>
                <div className='landing-info_text'>
                    <h2 className='heading-2'>{text.whoAreWe.title}</h2>
                    <p className='p--regular'>{text.whoAreWe.body}</p>
                    <Link
                        className='landing-info_link link link--primary link--corner-hover'
                        href='/about'
                    >
                        {text.readMore}
                    </Link>
                </div>
                <DecoratedPicture
                    imgUrl={`${config.url.CDN_URL}/img/styret.jpg`}
                    variant={4}
                    cornerSize={40}
                    width={150}
                    height={100}
                    cover={true}
                    className='landing-info_picture'
                />
            </div>

            <div className='landing-info'>
                <div className='landing-info_text'>
                    <h2 className='heading-2'>{text.companiesInfo.title}</h2>
                    <p className='p--regular'>{text.companiesInfo.body}</p>
                    <Link
                        className='landing-info_link link link--primary link--corner-hover'
                        href='/companies'
                    >
                        {text.readMore}
                    </Link>
                </div>
                <DecoratedPicture
                    imgUrl={config.url.CDN_URL + '/img/cyberdagen_preben.jpg'}
                    variant={2}
                    cornerSize={40}
                    width={150}
                    height={100}
                    cover={true}
                    className='landing-info_picture'
                />
            </div>

            <div className='landing-info'>
                <div className='landing-info_text'>
                    <h2 className='heading-2'>{text.sponsor.title}</h2>
                    <p className='p--regular'>{text.sponsor.body}</p>
                    <a
                        className='landing-info_link link link--primary link--corner-hover'
                        href='https://www.mnemonic.io/'
                        target='_blank'
                    >
                        {text.readMore}
                    </a>
                </div>
                <DecoratedPicture
                    imgUrl={config.url.CDN_URL + getSponsorPath()}
                    variant={0}
                    cornerSize={0}
                    width={100}
                    height={30}
                    className='landing-info_picture'
                />
            </div>
        </>
    )
}
