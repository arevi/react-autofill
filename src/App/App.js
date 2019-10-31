/* eslint-disable no-undef */
import React, { Component } from 'react';
import './App.css';
import Header from '../Components/Header/Header';
import ProfileSelect from '../Components/ProfileSelect/ProfileSelect';
import Options from '../Components/Options/Options';
import { getTestProfile, getDefaultOptions } from '../Utils/Defaults';

class App extends Component {
  // Constructor for the application
  constructor(props) {
    super(props);

    // Initializes state to the default values provided from Defaults.js
    this.state = {
      profiles: [getTestProfile()],
      options: getDefaultOptions()
    };
  }

  // Gets the profiles stored in LocalStorages
  getProfiles = () => {
    let profiles = JSON.parse(localStorage.getItem('profiles'));
    return profiles;
  };

  // Sets the profiles from state to localStorage
  setProfiles = profiles => {
    localStorage.setItem('profiles', JSON.stringify(profiles));
  };

  // Sets the current profile to be used for autofilling to Chrome's local storage
  setCurrentProfile = profile => {
    chrome.storage.local.set({ selectedProfile: profile });
  };

  // Gets the autofill options from localStorage
  getOptions = () => {
    let options = JSON.parse(localStorage.getItem('options'));
    return options;
  };

  // Sets the options to be used for autofill
  // Funny story, Chrome will not let the React extension persist storage through it's storage API, so LocalStorage is used to save/managed state
  // But Content Scripts cannot read from LocalStorage, they can only read from the Chrome Storage API, so we end up having to save our options in two places.
  setOptions = options => {
    localStorage.setItem('options', JSON.stringify(options));
    chrome.storage.local.set({ options: options });
  };

  // Handles the changing of options that are passed from children elements
  optionChangeHandler = (setting, option) => {
    let options = this.state.options;
    options[setting] = option;
    this.setState({ options: options });
  };

  // Handles initializing the state when the application is mounted for the first time
  componentDidMount() {
    let profiles = this.getProfiles();
    let options = this.getOptions();

    if (profiles) {
      this.setState({ profiles: profiles, options: options });
    } else {
      this.setProfiles(this.state.profiles);
      this.setOptions(this.state.options);
    }

    this.setCurrentProfile(this.state.profiles[0]);
  }

  // Updates our state and causes the application to rerender everytime profiles are updated
  componentDidUpdate() {
    this.setProfiles(this.state.profiles);
    this.setOptions(this.state.options);
    this.setCurrentProfile(this.state.profiles[0]);
  }

  // Render the actual Chrome extension window
  render() {
    return (
      <div className='App'>
        <Header title='Hype Autofill' />
        <ProfileSelect
          profiles={this.state.profiles}
          selection={profile => this.setCurrentProfile(profile)}
        />
        <Options
          options={this.state.options}
          selection={(selectedOption, newSetting) =>
            this.optionChangeHandler(selectedOption, newSetting)
          }
        />
      </div>
    );
  }
}

export default App;
