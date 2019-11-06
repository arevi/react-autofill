import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { saveProfiles } from '../../../Utils/storageHandler';
import Selector from '../../Selector/Selector';
import ProfileDetail from './ProfileDetail/ProfileDetail';
import './Profiles.css';

function Profiles(props) {
  const profiles = useSelector(state => state.profiles);
  const [editingProfile, setEditingProfile] = useState(profiles[0]);

  useEffect(() => {
    saveProfiles(profiles);
  }, [profiles]);

  useEffect(() => {}, [editingProfile]);

  const profileSelected = profileName => {
    let profile = profiles.filter(profile => profile.name === profileName)[0];
    setEditingProfile({ ...profile });
  };

  return (
    <div id='profile-area' className='page'>
      <Selector
        text='Edit Profile'
        selection={value => profileSelected(value)}
        items={profiles.map(profile => profile.name)}
      />
      <ProfileDetail activeEdit={editingProfile} allProfiles={profiles} />
    </div>
  );
}

export default Profiles;
