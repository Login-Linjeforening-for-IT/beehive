import {config} from '../../Constants';
import {withTranslation} from 'react-i18next'
import { useState } from 'react';

import './imageCarousel.css'

const InfoText = ({t, hovered}) => {
    return(
        <div className='image-carousel__info'>
            <h2 className='image-carousel__title'>{t(`imageCarousel.${hovered}.title`)}</h2>
            <p className='image-carousel__description'>{t(`imageCarousel.${hovered}.description`)}</p>   
        </div>
    )
}

const DisplayImages = ({t}) => {
    const [hovered, setHovered] = useState(-1);
    let maxImages = 15;

    return Array.from({ length: maxImages }, (_, i) => (
        <div key={i} className='image-carousel__slide' onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(-1)}>
            <img
                key={'img' + i}
                className='image-carousel__img'
                src={`${config.url.CDN_URL}/img/imagecarousel/${i+1}.jpg`}
                alt={t(`imageCarousel.${i + 1}.title`)}
            />
            {hovered == i && <InfoText key={'infotext' + i} hovered={hovered+1} t={t} />}
        </div>
    ))
}

const ImageCarousel = ({t}) => {
    return(
        <div className='image-carousel'>
            <div className="image-carousel__slider">
                <div className='image-carousel__slide-track'>
                    <DisplayImages t={t} />
                    <DisplayImages t={t} />
                </div>
            </div>
        </div>
    )
}

export default withTranslation('vervPage')(ImageCarousel)
