import {NavLink} from 'react-router-dom';

const MobileNavigation = (props) => {
  const close = () => {
    props.setIsOpen(false);
  }

  return (
    <nav className={(props.open ? 'Open ' : '') + 'MobileNavigation'}>
      <NavLink onClick={close} to="/about">
        <li>OM OSS</li>
      </NavLink>
      <NavLink onClick={close} to="events">
        <li>ARRANGEMENTER</li>
      </NavLink>
      <NavLink onClick={close} to="companies">
        <li>FOR BEDRIFTER</li>
      </NavLink>
    </nav>
  );
}

export default MobileNavigation;
