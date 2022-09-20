import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import MobileNavigation from './MobileNavigation';
import { config } from '../../Constants';

import './TopBar.css';

const TopBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
    
    return (
      <div className={`TopBar ${isOpen ? 'Open' : ''}`}>
        <Link className="Logo" to="/" onClick={isOpen ? toggle : ''} >
          <picture>
            <source srcSet={ config.url.CDN_URL + '/img/logo/logo-white-small.svg' } />
            <img alt="Login's logo" />
          </picture>
        </Link>
        <Navigation />
        <div className={`HamburgerIcon ${isOpen ? 'Open' : ''}`} onClick={toggle}>
            <div></div>
            <div></div>
        </div>
        <MobileNavigation open={isOpen} setIsOpen={setIsOpen} />
      </div>
    );
}

export default TopBar;
