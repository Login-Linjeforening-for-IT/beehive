import { useState, useEffect, useRef } from "react";
import "./ImageCarousel.css";
import RenderSmoothImage from "../images/rendersmoothimage/RenderSmoothImage";


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

const ImageCarousel = ({ slides }) => {

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
        setActiveIndex(prevIndex => (prevIndex + 1) % slides.length);
        setTimeout(() => setIsTransitioning(false), transitionDuration); // let transition complete before allowing navigation
    };

    const prev = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setActiveIndex(prevIndex => (prevIndex - 1 + slides.length) % slides.length);
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
        if (index === (activeIndex - 1 + slides.length) % slides.length) return "image-carousel__slide--prev";
        if (index === (activeIndex + 1) % slides.length) return "image-carousel__slide--next";
        if (index === (activeIndex + 2) % slides.length) return "image-carousel__slide--new-next";
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
				{slides.map((slides, index) => (
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
            <div className="image-carousel__dots">
                {slides.map((_, index) => (
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

export default ImageCarousel;