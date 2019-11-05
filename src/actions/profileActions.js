import { ADD_PROFILE, REMOVE_PROFILE, EDIT_PROFILE } from './actionTypes';

export const addProfile = profile => {
  return {
    type: ADD_PROFILE,
    payload: profile
  };
};

export const removeProfile = profile => {
  return {
    type: REMOVE_PROFILE,
    payload: profile
  };
};

export const editProfile = profile => {
  return {
    type: EDIT_PROFILE,
    payload: profile
  };
};
