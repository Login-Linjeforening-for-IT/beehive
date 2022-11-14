import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav className="Navigation">
          <NavLink to="/about">
            <li>OM OSS</li>
          </NavLink>
          <NavLink to="events">
            <li>ARRANGEMENTER</li>
          </NavLink>
          <NavLink to="companies">
            <li>FOR BEDRIFTER</li>
          </NavLink>
        </nav>
    );
}

export default Navigation;
