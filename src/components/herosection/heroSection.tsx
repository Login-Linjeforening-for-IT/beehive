import LoginLogo from '@components/svg/brandlogos/loginLogo'
import Button from '@components/button/button'
import no from '@text/landing/no.json'
import en from '@text/landing/en.json'
import Calendar from '@components/svg/symbols/calendar'
import School from '@components/svg/symbols/school'
import { cookies } from 'next/headers'
import './heroSection.css'

export default async function LandingPage() {
    const lang = ((await cookies()).get('lang')?.value || 'no') as Lang
    const text = lang === 'no' ? no : en

    return (
        <div test-id='hero' className='hero-section'>
            <div className='hero-section_container'>
                <div className='hero-section_top'>
                    <div className='hero-section_logo'>
                        <LoginLogo />
                    </div>
                    <div className='hero-section_content'>
                        <span className='hero-section_top-text'>
                            {text.heroSection.welcome}
                        </span>
                        <br />
                        <span className='hero-section_gradient-text'>login.no</span>
                        <div className='hero-section_buttons'>
                            {/* @ts-ignore */}
                            <Button
                                href='events'
                                leadingIcon={<Calendar className='w-6 h-6 fill-white'/>}
                                variant='primary'
                                target=''
                            >
                                {text.heroSection.secondaryButton}
                            </Button>
                            {/* @ts-ignore */}
                            <Button
                                href='about'
                                leadingIcon={<School className='w-6 h-6 fill-(--color-text-main)'/>}
                                variant='ghost'
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
