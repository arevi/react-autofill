import React from 'react';
import NavItem from '../NavItem/NavItem.jsx';
import './navbar.css';

function NavBar(props) {
  const routes = [
    {
      name: 'Home',
      route: ''
    },
    {
      name: 'Profiles',
      route: '/profiles'
    },
    {
      name: 'Settings',
      route: '/settings'
    }
  ];

  return (
    <nav>
      <ul>
        {routes.map(item => (
          <NavItem key={item.name} name={item.name} route={item.route} />
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;
