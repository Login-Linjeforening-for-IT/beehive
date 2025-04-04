'use server'

import ImageCarousel from '@components/shared/imagecarousel/ImageCarousel'
import Button from '@components/shared/button/Button'
import VervTabs from './VervTabs'
import no from '@text/verv/no.json'
import en from '@text/verv/en.json'
import { cookies } from 'next/headers'

export default async function Verv() {
    const lang = (await cookies()).get('lang')?.value || 'no'
    const text = lang === 'no' ? no : en
    const slides = []

    for (let i = 1; i <= 15; i++) {
        slides.push({
            imgSrc: `https://cdn.login.no/img/imagecarousel/${i}.jpg`,
            title: text.imageCarousel[String(i) as keyof typeof text.imageCarousel].title,
            description: text.imageCarousel[String(i) as keyof typeof text.imageCarousel].description,
        })
    }

    return (
        <div className='verv-page page-container'>
            <div className='page-section--normal'>
                <h1 className='heading-1 heading-1--top-left-corner'>{text.title}</h1>
            </div>
            <section className='mb-[2rem] 800px:mb-[5rem] verv-intro page-section--normal'>
                <p className='mt-0 p--highlighted'>
                    {text.intro}
                </p>
                <p className='mt-0 p--regular'>
                    {text.intro2}
                </p>
            </section>
            <section className='mb-[2rem] 800px:mb-[5rem] page-section--full-width'>
                {/* @ts-ignore */}
                <ImageCarousel slides={slides} />
            </section>
            <section className='verv-committees page-section--normal'>
                <h2 className='heading-2'>{text.committeeSection.title}</h2>
                <p className='p--regular'>{text.committeeSection.intro}</p>
            </section>
            <VervTabs />
            <section className='mb-[2rem] 800px:mb-[5rem] mt-[2rem] 400px:max-w-[50rem] mx-auto page-section--normal'>
                <h2
                    className='heading-2'
                >
                    {text.apply.title}
                </h2>
                <p
                    className='p--regular'
                    dangerouslySetInnerHTML={{ __html:  text.apply.body }}
                />
                {/* @ts-ignore */}
                <Button
                    href='https://forms.gle/nQrJuqo3C9URLRM29'
                    size='xl'
                    className='mt-[2rem] w-full 400px:text[1.3rem] 400px:mx-auto 400px:mt-[2rem] 400px:mb-0 400px:block 400px:w-fit'
                >
                    {text.apply.action}
                </Button>
            </section>
        </div>
    )
}
