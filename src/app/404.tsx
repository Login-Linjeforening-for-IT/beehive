import config from "@config"
import Button from "@components/button/Button"
import no from '@text/404/no.json'
import en from '@text/404/en.json'
import getCookie from "@utils/getCookie"

import "./page.css"

const lang = getCookie('lang') as 'no' | 'en' || 'no'
const text = lang === 'en' ? en : no

export default function NotFoundPage({t}: {t: any}) {
    return (
        <div className='not-found'>
            <picture className='not-found__pic'>
                <source srcSet={config.url.CDN_URL + "/img/pizza404.png"} />
                <img className='not-found__img' alt='Hangry 404'/>
            </picture>
            <div className='not-found__text'>
                <h1>{text.header1}</h1>
                <p className='not-found__p p--regular'>
                    {text.msg}
                </p>
                {/* @ts-ignore */}
                <Button href="-1" leadingIcon={<i className='material-symbols-sharp'>west</i>}>
                    {text.help}
                </Button>
            </div>
        </div>
    )
}
