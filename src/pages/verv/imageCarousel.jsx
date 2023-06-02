import {config} from '../../Constants';
import {useState, useEffect} from 'react'
import {withTranslation} from 'react-i18next'

import '../../components/tabs/Tabs.css'
import './CommitteeTabs.css'
import './imageCarousel.css'


const ImageCarousel = ({t}) => {
    const [activeImages, setActiveImages] = useState(1)

    const maxImages = 5

    useEffect(() => {
        const interval = setInterval(() => { 
            setActiveImages(prevActiveImages => prevActiveImages + 1 > maxImages ? 1 : prevActiveImages + 1)
        }, 5000) // every 5 seconds
        
        // Cleanup function
        return () => {
            clearInterval(interval);
        }
    }, [])

    let secondImage = activeImages % maxImages + 1;
    let thirdImage = (activeImages + 1) % maxImages + 1;

    let width = window.screen.width / 4

    if (width < 800) {
        <div className='imagecarousel'>
            <section className='verv-section'>
                <h2 className='verv-section__heading heading-2'>{t('imageCarousel.' + activeImages + '.' + 'title')}</h2>
                <p className='verv-section__p p--highlighted' dangerouslySetInnerHTML={{__html: t('imageCarousel.' + window.screen.width + '.' + 'description')}}/>
                <img width={width} className='carouselimage' src={config.url.CDN_URL + '/img/imagecarousel/' + activeImages + '.jpg'} />
            </section>
        </div>
    } else return (
        <div className='imagecarousel'>
            <section className='verv-section'>
                <h2 className='verv-section__heading heading-2'>{t('imageCarousel.' + activeImages + '.' + 'title')}</h2>
                <p className='verv-section__p p--highlighted' dangerouslySetInnerHTML={{__html: t('imageCarousel.' + window.screen.width + '.' + 'description')}}/>
                <div className='triplecarousel'>
                    <img width={width} className='carouselimage' src={config.url.CDN_URL + '/img/imagecarousel/' + activeImages + '.jpg'} />
                    <img width={width} className='carouselimage' src={config.url.CDN_URL + '/img/imagecarousel/' + secondImage + '.jpg'} />
                    <img width={width} className='carouselimage' src={config.url.CDN_URL + '/img/imagecarousel/' + thirdImage + '.jpg'} />
                </div>
            </section>
        </div>
    )
}

export default withTranslation('vervPage')(ImageCarousel)
