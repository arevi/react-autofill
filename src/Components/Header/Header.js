import React from 'react';
import './Header.css';

const Header = props => {
  // Returns our header DOM element with a supplied title in props.title
  return (
    <header>
      <h1 id='title-text'>{props.title}</h1>
    </header>
  );
};

export default Header;
