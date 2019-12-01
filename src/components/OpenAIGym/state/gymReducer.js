import { SET_STATUS } from "./types";

const setStatus = (status, state) => {
  return {
    ...state,
    status
  };
};

export default (state, action) => {
  switch (action.type) {
    case SET_STATUS:
      return setStatus(action.payload, state);
    default:
      return state;
  }
};
