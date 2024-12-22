import { config } from "../../Constants"

import Button from "../../components/button/Button"

import "./page.css"

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
