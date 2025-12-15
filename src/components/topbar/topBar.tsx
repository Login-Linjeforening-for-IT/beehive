import { cookies } from 'next/headers'
import { Navbar, NavDropdown, NavItem } from 'uibee/components'
import NO from '@text/layout/en.json'
import EN from '@text/layout/no.json'
import config from '@config'
import { Activity, BookMarked, BookOpen, Heart, Images, Music } from 'lucide-react'
import Office from '@components/svg/symbols/office'

export default async function Topbar({onlyLogo}: {onlyLogo: boolean}) {
    const Cookies = await cookies()
    const accessToken = Cookies.get('access_token')?.value || null
    const theme = Cookies.get('theme')?.value || 'dark'
    const lang = (Cookies.get('lang')?.value || 'no') as Lang
    const text = lang === 'no' ? NO : EN

    return (
        <Navbar
            lang={lang}
            theme={theme}
            token={accessToken}
            onlyLogo={onlyLogo}
            className='bg-transparent!'
        >
            <NavItem href='/events'>
                {text.nav.events}
            </NavItem>
            <NavItem href='/career'>
                {text.nav.jobad}
            </NavItem>
            <NavItem href='/companies'>
                {text.nav.companies}
            </NavItem>
            <NavDropdown title={text.nav.about} className='bg-(--color-bg-topbar-fallback)!'>
                <NavItem href='/about'>
                    <div>
                        <i className='logfont-login main-nav-dropdown_leading-icon' />
                        {text.nav.general}
                    </div>
                </NavItem>
                <NavItem href='/verv'>
                    <div className='flex flex-row items-center'>
                        <Heart className='size-6 stroke-(--color-text-regular) mr-[0.7rem]' />
                        {text.nav.verv}
                    </div>
                </NavItem>
                <NavItem href='/fond'>
                    <div className='flex flex-row items-center'>
                        <Office className='size-6 fill-(--color-text-regular) mr-[0.7rem]' />
                        {text.nav.fondet}
                    </div>
                </NavItem>
                <NavItem href={config.url.WIKI_URL} external target='_blank'>
                    <div className='flex flex-row items-center'>
                        <BookOpen className='size-6 stroke-(--color-text-regular) mr-[0.7rem]' />
                        Wiki
                    </div>
                </NavItem>
            </NavDropdown>
            <NavDropdown title={text.nav.more} className='bg-(--color-bg-topbar-fallback)!'>
                <NavItem href={config.url.EXAM_URL} external target='_blank'>
                    <div className='flex flex-row items-center'>
                        <BookMarked className='size-6 stroke-(--color-text-regular) mr-[0.7rem]' />
                        {text.nav.exam}
                    </div>
                </NavItem>
                <NavItem href='/albums'>
                    <div className='flex flex-row items-center'>
                        <Images className='size-6 stroke-(--color-text-regular) mr-[0.7rem]' />
                        {text.nav.albums}
                    </div>
                </NavItem>
                <NavItem href='/music'>
                    <div className='flex flex-row items-center'>
                        <Music className='size-6 stroke-(--color-text-regular) mr-[0.7rem]' />
                        {text.nav.music}
                    </div>
                </NavItem>
                <NavItem href='/status'>
                    <div className='flex flex-row items-center'>
                        <Activity className='size-6 stroke-(--color-text-regular) mr-[0.7rem]' />
                        {text.nav.status}
                    </div>
                </NavItem>
            </NavDropdown>
        </Navbar>
    )
}