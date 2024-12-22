//
// This page is a work in progress ( not is use )
//
import no from '@text/profile/no.json'
import en from '@text/profile/en.json'
import getCookie from "@utils/getCookie"

import "./page.css"

const lang = getCookie('lang') as 'no' | 'en' || 'no'
const text = lang === 'en' ? en : no

export default function Profile({t}: any) {
    return (
        <div className='profile-page page-container'>
            <h1 className='heading-1 heading-1--top-left-corner'>{text.title}</h1>
            <section className='profile-section profile-intro'>
                <p className='profile-intro__p profile-section__p p--highlighted' dangerouslySetInnerHTML={{__html: text.intro}}/>
            </section>
            <section className='profile-section profile-mid'>
                <h2 className='profile-section__heading heading-2'>{text.title}</h2>
                <p className='profile-section__p p--regular'>{text.intro}</p>
            </section>
        </div>
    )
}
