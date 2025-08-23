'use server'

import config from '@config'
import Button from '@components/shared/button/Button'
import no from '@text/404/no.json'
import en from '@text/404/en.json'
import Image from 'next/image'
import West from '@components/svg/symbols/West'
import { cookies } from 'next/headers'

export default async function NotFoundPage() {
    const lang = (await cookies()).get('lang')?.value || 'no'
    const text = lang === 'no' ? no : en

    return (
        <div className='py-[4rem] px-[1rem] max-w-[40rem] m-auto 800px:flex 800px:items-center 800px:justify-around 800px:max-w-[75rem] 800px:gap-[2rem]'>
            <div className='block w-full max-w-[40rem] m-auto'>
                <Image
                    src={`${config.url.CDN_URL}/img/pizza404.png`} 
                    className='not-block w-full max-w-[40rem] m-auto' alt='Hangry 404'
                    width={1508}
                    height={1200}
                />
            </div>
            <div className='block w-full mt-4 800px:w-fit 800px:m-auto 800px:text-left 800px:pr-[1rem]'>
                <h1 className='text-[2rem]'>{text.header1}</h1>
                <p className='p--regular'>
                    {text.msg}
                </p>
                <Button href='-1' leadingIcon={<West className='' />}>
                    {text.help}
                </Button>
            </div>
        </div>
    )
}
