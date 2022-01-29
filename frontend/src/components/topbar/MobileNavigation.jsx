import { Link } from 'react-router-dom';

const MobileNavigation = (props) => {
    return (
        <nav className={(props.hidden ? 'hidden ' : '') + 'MobileNavigation'}>
            <Link to="/about">Om oss</Link>
            <Link to="/events">Arrangementer</Link>
            <Link to="/page/companies">For Bedrifter</Link>
        </nav>
    );
}

export default MobileNavigation;
