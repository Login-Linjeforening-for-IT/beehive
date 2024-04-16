import { useState } from "react";
import './DropDownBox.css';

const DropDownBox = ({ title, children }) => {
    const [isOpen, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!isOpen);
    };
 
    return (
        <div className={`drop-down-box ${isOpen ? 'drop-down-box--open' : ''}`}>
            <div 
                className='drop-down-box__toggle'
                onClick={e => handleClick(e)}
            >
                <div>{ title }</div>
                <i className='material-symbols-sharp drop-down-box__toggle-icon'>
                    chevron_right
                </i>
            </div>
            <div className={`drop-down-box__content ${isOpen ? 'drop-down-box__content--open' : ''}`}>
                {children}
            </div>
        </div>
    )
}

export default DropDownBox;