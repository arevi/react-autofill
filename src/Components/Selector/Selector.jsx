import React from 'react';
import './Selector.css';

function Selector(props) {
  return (
    <div id='selector'>
      <p id='profile-text'>{props.text}</p>
      <select
        id='selector-dropdown'
        onChange={e => props.selection(e.target.value)}
      >
        {props.items.map(item => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Selector;
