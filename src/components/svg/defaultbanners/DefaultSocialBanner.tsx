import * as ColorManipulation from "../../../utils/ColorManipulation.ts"
import "./defualt-banner.css"

export default function DefaultSocialBanner({ color, transition = true, className = "" }: ColorTransitionClassNameProps) {

    let gradient = color
    let fillColor = "white"

    if (ColorManipulation.isValidHex(color)) {
        gradient = ColorManipulation.createGradient(color)
        fillColor = ColorManipulation.adjustBrightnessHex(color, -0.3) || "white"
    }

    return (
        <div className={`default-banner ${transition ? "default-banner--transition" : ""} ${className}`} style={{background: gradient}}>
            <svg className='default-banner__svg' viewBox="0 0 500 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill={fillColor} fillRule="evenodd" clipRule="evenodd" d="M242.5 64.75C223.032 64.75 207.25 80.532 207.25 100C207.25 119.468 223.032 135.25 242.5 135.25C261.968 135.25 277.75 119.468 277.75 100C277.75 80.532 261.968 64.75 242.5 64.75ZM202.75 100C202.75 78.0467 220.547 60.25 242.5 60.25C264.453 60.25 282.25 78.0467 282.25 100C282.25 121.953 264.453 139.75 242.5 139.75C220.547 139.75 202.75 121.953 202.75 100Z" />
                <path fill={fillColor} fillRule="evenodd" clipRule="evenodd" d="M240.25 62.5V47.5H244.75V62.5H240.25Z" />
                <path fill={fillColor} fillRule="evenodd" clipRule="evenodd" d="M250 49.75H235V45.25H250V49.75Z" />
                <path fill={fillColor} fillRule="evenodd" clipRule="evenodd" d="M242.5 64.75C233.151 64.75 224.185 68.4638 217.574 75.0745C210.964 81.6851 207.25 90.6511 207.25 100C207.25 109.349 210.964 118.315 217.574 124.926C224.185 131.536 233.151 135.25 242.5 135.25V139.75C231.958 139.75 221.847 135.562 214.393 128.108C206.938 120.653 202.75 110.542 202.75 100C202.75 89.4576 206.938 79.3471 214.393 71.8925C221.847 64.4379 231.958 60.25 242.5 60.25V64.75Z" />
                <path fill={fillColor} fillRule="evenodd" clipRule="evenodd" d="M242.5 64.75C238.566 64.75 234.204 67.7979 230.708 74.5215C227.255 81.1622 225.25 90.3257 225.25 100C225.25 109.674 227.255 118.838 230.708 125.478C234.204 132.202 238.566 135.25 242.5 135.25V139.75C236.091 139.75 230.533 134.896 226.715 127.555C222.854 120.13 220.75 110.217 220.75 100C220.75 89.7831 222.854 79.8701 226.715 72.4455C230.533 65.1038 236.091 60.25 242.5 60.25V64.75Z" />
                <path fill={fillColor} fillRule="evenodd" clipRule="evenodd" d="M240.25 137.5V62.5H244.75V137.5H240.25Z" />
                <path fill={fillColor} fillRule="evenodd" clipRule="evenodd" d="M254.292 74.5215C250.796 67.7979 246.434 64.75 242.5 64.75V60.25C248.909 60.25 254.467 65.1038 258.285 72.4455C262.146 79.8701 264.25 89.7831 264.25 100C264.25 110.217 262.146 120.13 258.285 127.555C254.467 134.896 248.909 139.75 242.5 139.75V135.25C246.434 135.25 250.796 132.202 254.292 125.478C257.745 118.838 259.75 109.674 259.75 100C259.75 90.3257 257.745 81.1622 254.292 74.5215Z" />
                <path fill={fillColor} fillRule="evenodd" clipRule="evenodd" d="M280 102.25H205V97.75H280V102.25Z" />
                <path fill={fillColor} fillRule="evenodd" clipRule="evenodd" d="M277 85.75H208V81.25H277V85.75Z" />
                <path fill={fillColor} fillRule="evenodd" clipRule="evenodd" d="M277 118.75H208V114.25H277V118.75Z" />
                <path fill={fillColor} fillRule="evenodd" clipRule="evenodd" d="M291.25 57.416L295.835 72.2643L302.068 76.7503L295.835 81.2362L291.25 96.0846L286.665 81.2363L280.432 76.7503L286.665 72.2643L291.25 57.416ZM291.25 67.5846L289.235 74.1112L285.568 76.7503L289.235 79.3893L291.25 85.916L293.265 79.3893L296.932 76.7503L293.265 74.1112L291.25 67.5846Z" />
                <path fill={fillColor} fillRule="evenodd" clipRule="evenodd" d="M277.75 125.079L281.724 137.496L287.13 141.25L281.724 145.005L277.75 157.422L273.776 145.005L268.37 141.25L273.776 137.496L277.75 125.079ZM277.75 134.922L276.324 139.38L273.63 141.25L276.324 143.121L277.75 147.579L279.176 143.121L281.87 141.25L279.176 139.38L277.75 134.922Z" />
            </svg>
        </div>
    )
}
