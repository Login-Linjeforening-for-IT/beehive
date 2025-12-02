import DecoratedPicture from '@components/images/decoratedpicture/decoratedPicture'
import no from '@text/landing/no.json'
import en from '@text/landing/en.json'
import Link from 'next/link'
import config from '@config'
import { cookies } from 'next/headers'

export default async function SmallInfo() {
    const theme = (await cookies()).get('theme')?.value || 'dark'
    const lang = ((await cookies()).get('lang')?.value || 'no') as Lang
    const text = lang === 'no' ? no : en

    function getSponsorPath() {
        if (theme === 'light') {
            return '/img/company/mnemonic-logo_dark-nopayoff-2021.svg'
        } else {
            return '/img/company/mnemonic-logo_light-nopayoff-2021.svg'
        }
    }

    return (
        <>
            <div test-id='small' className='max-w-300 w-full m-[3rem_auto] grid gap-x-16 p-4 grid-cols-1 800px:p-[8rem_2rem_0] 800px:grid-cols-7 800px:gap-16 1000px:gap-20 1200px:gap-24'>
                <div className='order-2 800px:col-span-3 w-full max-w-124 m-auto p-[1rem_0]'>
                    <h2 className='heading-2'>{text.whoAreWe.title}</h2>
                    <p className='p--regular'>{text.whoAreWe.body}</p>
                    <Link
                        className='mt-4 p-[.7rem_1rem_.7rem_0] text-[1.3rem] w-fit block link link--primary link--corner-hover'
                        href='about'
                    >
                        {text.readMore}
                    </Link>
                </div>
                <DecoratedPicture
                    imgUrl={`${config.url.CDN_URL}/img/board/gruppebilde.JPG`}
                    variant={4}
                    cornerSize={40}
                    width={150}
                    height={100}
                    cover={true}
                    className='order-1 800px:col-span-4 w-full max-w-124 m-auto 800px:max-w-160'
                />
            </div>

            <div className='max-w-300 w-full m-[3rem_auto] grid gap-x-16 p-4 grid-cols-1 800px:p-[8rem_2rem_0] 800px:grid-cols-7 800px:gap-16 1000px:gap-20 1200px:gap-24'>
                <div className='order-2 800px:order-1 800px:col-span-3 w-full max-w-124 m-auto p-[1rem_0]'>
                    <h2 className='heading-2'>{text.companiesInfo.title}</h2>
                    <p className='p--regular'>{text.companiesInfo.body}</p>
                    <Link
                        className='mt-4 p-[.7rem_1rem_.7rem_0] text-[1.3rem] w-fit block link link--primary link--corner-hover'
                        href='companies'
                    >
                        {text.readMore}
                    </Link>
                </div>
                <DecoratedPicture
                    imgUrl={`${config.url.CDN_URL}/img/cyberdagen_preben.jpg`}
                    variant={2}
                    cornerSize={40}
                    width={150}
                    height={100}
                    cover={true}
                    className='order-1 800px:order-2 800px:col-span-4 w-full max-w-124 m-auto 800px:max-w-160'
                />
            </div>

            <div className='max-w-300 w-full m-[3rem_auto] grid gap-x-16 p-4 grid-cols-1 800px:p-[8rem_2rem_0] 800px:grid-cols-7 800px:gap-16 1000px:gap-20 1200px:gap-24'>
                <div className='order-2 800px:col-span-3 w-full max-w-124 m-auto p-[1rem_0]'>
                    <h2 className='heading-2'>{text.sponsor.title}</h2>
                    <p className='p--regular'>{text.sponsor.body}</p>
                    <a
                        className='mt-4 p-[.7rem_1rem_.7rem_0] text-[1.3rem] w-fit block link link--primary link--corner-hover'
                        href='https://www.mnemonic.io/'
                        target='_blank'
                    >
                        {text.readMore}
                    </a>
                </div>
                <DecoratedPicture
                    imgUrl={`${config.url.CDN_URL}${getSponsorPath()}`}
                    variant={0}
                    cornerSize={0}
                    width={100}
                    height={30}
                    className={'order-1 800px:col-span-4 w-full max-w-124 m-auto 800px:max-w-160 transition-all duration-1000 ease-linear'}
                />
            </div>
        </>
    )
}
