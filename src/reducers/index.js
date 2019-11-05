import { combineReducers } from 'redux';
import profilesReducer from './profiles';
import optionsReducer from './options';

const reducers = combineReducers({
  profiles: profilesReducer,
  options: optionsReducer
});

export default reducers;
