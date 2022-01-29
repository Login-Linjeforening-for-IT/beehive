import { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Navigation from './Navigation';
import MobileNavigation from './MobileNavigation';
import HamburgerIcon from './HamburgerIcon';
import './TopBar.css';

const TopBar = () => {
    const [hideMenu, setHideMenu] = useState(true);

    const handleClick = (e) => {
        setHideMenu(!hideMenu);
    }
    
    return (
    <div className="TopBar">
        <button className="HamburgerMenu" onClick={handleClick}>
            <HamburgerIcon />
        </button>
        <Router>
            <Link className="Logo" to="/">
                <picture>
                    <source  srcSet={process.env.PUBLIC_URL + '/img/logo-white.svg'} />
                    <img alt="Login's logo" />
                </picture>
            </Link>
            <div>
                <Navigation />
                <MobileNavigation hidden={hideMenu} />
            </div>
        </Router>
    </div>
    );
}

export default TopBar;
