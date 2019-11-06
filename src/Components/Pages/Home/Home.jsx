/* eslint-disable no-undef */
import React from 'react';
import { useSelector } from 'react-redux';
import Selector from '../../Selector/Selector';
import { setCurrentProfile } from '../../../Utils/storageHandler';
import './home.css';

function Home(props) {
  const profiles = useSelector(state => state.profiles);

  // Sets the current profile to be used for autofilling to Chrome's local storage
  const setProfile = profileName => {
    let profile = profiles.filter(item => item.name === profileName)[0];
    setCurrentProfile(profile);
  };

  return (
    <div id='home' className='page'>
      <Selector
        text='Active Profile'
        selection={value => setProfile(value)}
        items={profiles.map(profile => profile.name)}
      />
    </div>
  );
}

export default Home;
