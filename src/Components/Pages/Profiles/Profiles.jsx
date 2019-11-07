import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveProfiles } from '../../../Utils/storageHandler';
import {
  addProfile,
  editProfile,
  removeProfile
} from '../../../actions/profileActions';
import Selector from '../../Selector/Selector';
import ProfileDetail from './ProfileDetail/ProfileDetail';
import './Profiles.css';

function Profiles(props) {
  const dispatch = useDispatch();
  const profiles = useSelector(state => state.profiles);
  const [editingProfile, setEditingProfile] = useState(profiles[0]);

  useEffect(() => {
    saveProfiles(profiles);
  }, [profiles]);

  const profileSelected = profileName => {
    let profile = profiles.filter(profile => profile.name === profileName)[0];
    setEditingProfile({ ...profile });
  };

  const addOrUpdateProfile = profile => {
    let matches = profiles.filter(item => item.name === profile.name);

    if (matches.length === 0) {
      dispatch(addProfile(profile));
    } else {
      dispatch(editProfile(profile));
    }
  };

  return (
    <div id='profile-area' className='page'>
      <Selector
        text='Edit Profile'
        selection={value => profileSelected(value)}
        items={profiles.map(profile => profile.name)}
      />
      <ProfileDetail
        activeEdit={editingProfile}
        allProfiles={profiles}
        updateProfile={profile => addOrUpdateProfile(profile)}
        deleteProfile={profile => dispatch(removeProfile(profile))}
      />
    </div>
  );
}

export default Profiles;
