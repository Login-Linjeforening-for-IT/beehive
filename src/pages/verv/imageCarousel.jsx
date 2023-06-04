import {config} from '../../Constants';
import {withTranslation} from 'react-i18next'
import { useState } from 'react';

import '../../components/tabs/Tabs.css'
import './VervTabs'
import './imageCarousel.css'

const InfoText = ({t, hovered}) => {
    return(
        <div className='info'>
            <h2 className='info-title'>{t(`imageCarousel.${hovered}.title`)}</h2>
            <p className='info-description'>{t(`imageCarousel.${hovered}.description`)}</p>   
        </div>
    )
}

const DisplayImages = ({t}) => {
    const [hovered, setHovered] = useState(-1);
    let maxImages = 5;

    return Array.from({ length: maxImages }, (_, i) => (
        <div className='slide' onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(-1)}>
            <img className='carouselImage' src={`${config.url.CDN_URL}/img/imagecarousel/${i+1}.jpg`} />
            {hovered == i && <InfoText hovered={hovered+1} t={t} />}
        </div>
    ))
}

const ImageCarousel = ({t}) => {
    return(
        <body className='imageCarousel'>
            <div className="slider">
                <div className='slide-track'>
                    <DisplayImages t={t} />
                    <DisplayImages t={t} />
                </div>
            </div>
        </body>
    )
}

export default withTranslation('vervPage')(ImageCarousel)
