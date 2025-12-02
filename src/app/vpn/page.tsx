'use server'

import config from '@config'
import no from '@text/vpn/no.json'
import en from '@text/vpn/en.json'
import Image from 'next/image'
import { cookies } from 'next/headers'

export default async function Page() {
    const lang = ((await cookies()).get('lang')?.value || 'no') as Lang
    const text = lang === 'no' ? no : en

    return (
        <div className='py-16 px-4 max-w-160 m-auto 800px:flex 800px:items-center 800px:justify-around 800px:max-w-300 800px:gap-8'>
            <div className='block w-full max-w-160 m-auto'>
                <Image
                    src={`${config.url.CDN_URL}/img/pizza503.png`}
                    className='not-block w-full max-w-160 m-auto' alt='Hangry 503'
                    width={1508}
                    height={1200}
                />
            </div>
            <div className='block w-full mt-4 800px:w-fit 800px:m-auto 800px:text-left 800px:pr-4'>
                <h1 className='text-8'>{text.header1}</h1>
                <p className='p--regular'>
                    {text.msg}
                </p>
            </div>
        </div>
    )
}
