import LoginLogo from '@components/svg/brandlogos/LoginLogo'
import Button from '@components/shared/button/Button'
import no from '@text/landing/no.json'
import en from '@text/landing/en.json'
import Calendar from '@components/svg/symbols/Calendar'
import School from '@components/svg/symbols/School'
import { cookies } from 'next/headers'
import './HeroSection.css'
import config from '@config'

export default async function LandingPage() {
    const lang = (await cookies()).get('lang')?.value || 'no'
    const text = lang === 'no' ? no : en

    return (
        <div className='hero-section'>
            <div className='hero-section_container'>
                <div className='hero-section_top'>
                    <picture className='hero-section_logo'>
                        <LoginLogo />
                    </picture>
                    <div className='hero-section_content'>
                        <span className='hero-section_top-text'>
                            {text.heroSection.welcome}
                        </span>
                        <br />
                        <span className='hero-section_gradient-text'>{config.url.MAIN_URL}</span>
                        <div className='hero-section_buttons'>
                            {/* @ts-ignore */}
                            <Button
                                href='/events'
                                leadingIcon={<Calendar className='w-[1.5rem] h-[1.5rem] fill-white'/>}
                                variant='primary'
                                target=''
                            >
                                {text.heroSection.secondaryButton}
                            </Button>
                            {/* @ts-ignore */}
                            <Button
                                variant='ghost'
                                href='/about'
                                leadingIcon={<School className='w-[1.5rem] h-[1.5rem] fill-white'/>}
                                target=''
                            >
                                {text.heroSection.primaryButton}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
