import { useState, useEffect, useRef, useCallback } from "react";
import { withTranslation } from 'react-i18next';
import "./ImageCarousel.css";
import RenderSmoothImage from "../../components/picture/RenderSmoothImage/RenderSmoothImage";

const images = [
    "https://cdn.login.no/img/imagecarousel/1.jpg",
    "https://cdn.login.no/img/imagecarousel/2.jpg",
    "https://cdn.login.no/img/imagecarousel/3.jpg",
    "https://cdn.login.no/img/imagecarousel/4.jpg",
    "https://cdn.login.no/img/imagecarousel/5.jpg",
    "https://cdn.login.no/img/imagecarousel/6.jpg",
    "https://cdn.login.no/img/imagecarousel/7.jpg",
    "https://cdn.login.no/img/imagecarousel/8.jpg",
    "https://cdn.login.no/img/imagecarousel/9.jpg",
    "https://cdn.login.no/img/imagecarousel/10.jpg",
    "https://cdn.login.no/img/imagecarousel/11.jpg",
    "https://cdn.login.no/img/imagecarousel/12.jpg",
    "https://cdn.login.no/img/imagecarousel/13.jpg",
    "https://cdn.login.no/img/imagecarousel/14.jpg",
    "https://cdn.login.no/img/imagecarousel/15.jpg"
];

const NavigationButton = ({ side, onClick, onFocus }) => (
    <button
        className={`image-carousel__nav-item image-carousel__nav-item--${side}`}
        onClick={onClick}
        onFocus={onFocus}
        aria-label={side === 'left' ? 'previous' : 'next'}
    ></button>
);

const SlideItem = ({ image, index, className, title, description, onFocus }) => (
	<div
		key={index}
		className={`image-carousel__slide ${className}`}
		onFocus={onFocus}
	>
		<div className="image-carousel__image-overlay">
			<div className="image-carousel__image-overlay-info">
				<h2 className="image-carousel__image-overlay-title">{title}</h2>
				<p className="image-carousel__image-overlay-description">{description}</p>
			</div>
		</div>
        <RenderSmoothImage 
		    src={image}
            alt={title}
            className='image-carousel__image'
        />
	</div>
);

const DotIndicator = ({ index, isActive }) => (
    <div
        key={index}
        className={`image-carousel__dot-container ${isActive ? "image-carousel__dot-container--active" : ""}`}
    >
        <div className='image-carousel__dot'></div>
    </div>
);

const ImageCarousel = ({ t }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (!isPaused) {
            startCarousel();
        }

        return () => {
            clearInterval(intervalRef.current);
        };
    }, [isPaused]);

    const startCarousel = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            next(true);
        }, 3000);
    };

    const next = (isAutoCarousel = false) => {
        if (isTransitioning) return; // prevent new transition if there is an ongoing transition
        const transitionDuration = isAutoCarousel ? 1600 : 500; // automatic transitions are slower
        setIsTransitioning(true);
        setActiveIndex(prevIndex => (prevIndex + 1) % images.length);
        setTimeout(() => setIsTransitioning(false), transitionDuration); // let transition complete before allowing navigation
    };

    const prev = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setActiveIndex(prevIndex => (prevIndex - 1 + images.length) % images.length);
        setTimeout(() => setIsTransitioning(false), 500); // let transition complete before allowing navigation
    };

    const pause = () => {
        setIsPaused(true);
        clearInterval(intervalRef.current);
    };

    const resume = () => {
        // delay before starting new auto carousel in case there is an ongoing transition
        setTimeout(() => {
            setIsPaused(false);
        }, 500);
    };

    const getClassName = index => {
        if (index === activeIndex) return "image-carousel__slide--active";
        if (index === (activeIndex - 1 + images.length) % images.length) return "image-carousel__slide--prev";
        if (index === (activeIndex + 1) % images.length) return "image-carousel__slide--next";
        if (index === (activeIndex + 2) % images.length) return "image-carousel__slide--new-next";
        return "image-carousel__slide--hide";
    };

    return (
        <div className={`image-carousel ${isPaused ? "image-carousel--paused" : ""}`}>
            <div
                className="image-carousel__slides-container"
                onMouseEnter={pause}
                onMouseLeave={resume}
                aria-live="polite"
            >
                <NavigationButton
                    side="left"
                    onClick={() => prev()}
                />
				{images.map((image, index) => (
					<SlideItem
						key={index}
						image={image}
						index={index}
						className={getClassName(index)}
						title={t(`imageCarousel.${index + 1}.title`)}
						description={t(`imageCarousel.${index + 1}.description`)}
					/>
				))}
				<NavigationButton
                    side="right"
                    onClick={() => next()}
                />
            </div>
            <div className="image-carousel__dots">
                {images.map((_, index) => (
                    <DotIndicator
                        key={index}
                        index={index}
                        isActive={index === activeIndex}
                    />
                ))}
            </div>
        </div>
    );
};

export default withTranslation('vervPage')(ImageCarousel);