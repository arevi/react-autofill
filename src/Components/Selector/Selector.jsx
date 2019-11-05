import React from 'react';
import { useSelector } from 'react-redux';
import './Selector.css';

function Selector(props) {
  const profiles = useSelector(state => state.profiles);
  return (
    <div id='selector'>
      <p id='profile-text'>{props.text}</p>
      <select
        id='selector-dropdown'
        onChange={e => props.selection(e.target.value)}
      >
        {profiles.map(profile => (
          <option value={profile.name} key={profile.name}>
            {profile.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Selector;
