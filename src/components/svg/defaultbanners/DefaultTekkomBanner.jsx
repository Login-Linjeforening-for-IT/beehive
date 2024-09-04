import * as ColorManipulation from "../../../utils/ColorManipulation.js";
import './defualt-banner.css';

const DefaultTekkomBanner = ({ color, transition = true, className = '' }) => {

    let gradient, fillColor;

    if (ColorManipulation.isValidHex(color)) {
        gradient = ColorManipulation.createGradient(color);
        fillColor = ColorManipulation.adjustBrightnessHex(color, -0.3);
    } else {
        gradient = color;
        fillColor = "white";
    }

    return (
        <div className={`default-banner ${transition ? 'default-banner--transition' : ''} ${className}`} style={{background: gradient}}>
            <svg className='default-banner__svg' viewBox="0 0 500 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M225 75.0505L230.271 80.3219L210.543 100.051L230.271 119.779L225 125.051L200 100.051L225 75.0505Z" fill={fillColor}/>
                <path fillRule="evenodd" clipRule="evenodd" d="M236.045 128.638L256.919 69L263.955 71.4627L243.081 131.101L236.045 128.638Z" fill={fillColor}/>
                <path fillRule="evenodd" clipRule="evenodd" d="M289.457 100.051L269.729 80.3219L275 75.0505L300 100.051L275 125.051L269.729 119.779L289.457 100.051Z" fill={fillColor}/>
            </svg>
        </div>
    )
}

export default DefaultTekkomBanner
