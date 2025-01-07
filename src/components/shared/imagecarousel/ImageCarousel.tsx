'use client'

import { useState, useEffect, useRef } from 'react'
import './ImageCarousel.css'
import RenderSmoothImage from '@components/shared/images/rendersmoothimage/RenderSmoothImage'

function NavigationButton({ side, onClick, onFocus }: any) {
    return (
        <button
            className={`image-carousel_nav-item image-carousel_nav-item--${side}`}
            onClick={onClick}
            onFocus={onFocus}
            aria-label={side === 'left' ? 'previous' : 'next'}
        ></button>
    )
}

function SlideItem({ image, index, className, title, description, onFocus }: any) {
    return (
        <div
            key={index}
            className={`image-carousel_slide ${className}`}
            onFocus={onFocus}
        >
            <div className="image-carousel_image-overlay">
                <div className="image-carousel_image-overlay-info">
                    <h2 className="image-carousel_image-overlay-title">{title}</h2>
                    <p className="image-carousel_image-overlay-description">{description}</p>
                </div>
            </div>
            <RenderSmoothImage 
                src={image}
                alt={title}
                className='image-carousel_image'
                onError={undefined}
                transition={false}
            />
        </div>
    )
}

function DotIndicator({ index, isActive }: {index: number, isActive: boolean}) {
    return (
        <div
            key={index}
            className={`image-carousel_dot-container ${isActive ? 'image-carousel_dot-container--active' : ''}`}
        >
            <div className='image-carousel_dot'></div>
        </div>
    )
}

export default function ImageCarousel({ slides }: any) {

    const [activeIndex, setActiveIndex] = useState(0)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const intervalRef = useRef<any>(null)

    useEffect(() => {
        if (!isPaused) {
            startCarousel()
        }

        return () => {
            clearInterval(intervalRef.current)
        }
    }, [isPaused])

    function startCarousel() {
        clearInterval(intervalRef.current)
        intervalRef.current = setInterval(() => {
            next(true)
        }, 3000)
    }

    const next = (isAutoCarousel = false) => {
        // prevent new transition if there is an ongoing transition
        if (isTransitioning) return
        
        // automatic transitions are slower
        const transitionDuration = isAutoCarousel ? 1600 : 500
        setIsTransitioning(true)
        setActiveIndex(prevIndex => (prevIndex + 1) % slides.length)
        
        // let transition complete before allowing navigation
        setTimeout(() => setIsTransitioning(false), transitionDuration)
    }

    function prev() {
        if (isTransitioning) return
        setIsTransitioning(true)
        setActiveIndex(prevIndex => (prevIndex - 1 + slides.length) % slides.length)
        
        // let transition complete before allowing navigation
        setTimeout(() => setIsTransitioning(false), 500)
    }

    function pause() {
        setIsPaused(true)
        clearInterval(intervalRef.current)
    }

    function resume() {
        // delay before starting new auto carousel in case there is an ongoing transition
        setTimeout(() => {
            setIsPaused(false)
        }, 500)
    }

    function getClassName(index: number) {
        if (index === activeIndex) return 'image-carousel_slide--active'
        if (index === (activeIndex - 1 + slides.length) % slides.length) return 'image-carousel_slide--prev'
        if (index === (activeIndex + 1) % slides.length) return 'image-carousel_slide--next'
        if (index === (activeIndex + 2) % slides.length) return 'image-carousel_slide--new-next'
        return 'image-carousel_slide--hide'
    }

    return (
        <div className={`image-carousel ${isPaused ? 'image-carousel--paused' : ''}`}>
            <div
                className="image-carousel_slides-container"
                onMouseEnter={pause}
                onMouseLeave={resume}
                aria-live="polite"
            >
                <NavigationButton
                    side="left"
                    onClick={() => prev()}
                />
                {slides.map((slides: any, index: number) => (
                    <SlideItem
                        key={index}
                        image={slides.imgSrc}
                        index={index}
                        className={getClassName(index)}
                        title={slides.title}
                        description={slides.description}
                    />
                ))}
                <NavigationButton
                    side="right"
                    onClick={() => next()}
                />
            </div>
            <div className="image-carousel_dots">
                {slides.map((_: any, index: number) => (
                    <DotIndicator
                        key={index}
                        index={index}
                        isActive={index === activeIndex}
                    />
                ))}
            </div>
        </div>
    )
}
