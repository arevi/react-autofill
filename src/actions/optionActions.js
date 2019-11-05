import { SET_OPTIONS } from './actionTypes';

export const setOptions = options => {
  return {
    type: SET_OPTIONS,
    payload: options
  };
};
