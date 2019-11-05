import {
  ADD_PROFILE,
  REMOVE_PROFILE,
  EDIT_PROFILE
} from '../actions/actionTypes.js';

const profilesReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_PROFILE:
      return [...state, action.payload];
    case REMOVE_PROFILE:
      return state.filter(profile => profile.name !== action.payload.name);
    case EDIT_PROFILE:
      let newState = state;
      let profileIndex = state.findIndex(
        profile => profile.name === action.payload.name
      );
      newState[profileIndex] = action.payload;
      return newState;
    default:
      return state;
  }
};

export default profilesReducer;
