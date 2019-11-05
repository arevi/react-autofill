import React from 'react';
import { NavLink } from 'react-router-dom';
import './navitem.css';

function NavItem(props) {
  return (
    <NavLink
      exact={props.name !== 'Home' ? false : true}
      to={props.route}
      activeClassName='selected'
    >
      <li>{props.name}</li>
    </NavLink>
  );
}

export default NavItem;
