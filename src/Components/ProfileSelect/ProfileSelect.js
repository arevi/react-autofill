import React from 'react';
import './ProfileSelect.css';

const ProfileSelect = props => {
  // Returns the profile selection DOM element
  // This element will receive a prop containing a list of profiles
  // These profiles will be iterated over to produce a dynamic amount of dropdown options
  return (
    <div id='profile-area'>
      <p id='profile-text'>Profile</p>
      <select
        name='profile-selection'
        id='profile-dropdown'
        onChange={e => props.selection(e.target.value)}
      >
        {props.profiles.map(profile => (
          <option value={profile.name}>{profile.name}</option>
        ))}
      </select>
    </div>
  );
};

export default ProfileSelect;
