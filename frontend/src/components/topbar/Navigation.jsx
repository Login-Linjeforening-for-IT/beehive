import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav className="Navigation">
            <Link to="/about">OM OSS</Link>
            <Link to="/events">ARRANGEMENTER</Link>
            <Link to="/page/companies">FOR BEDRIFTER</Link>
        </nav>
    );
}

export default Navigation;
