import { SET_ADMINS } from "../types";

let INITIAL_STATE = {
  admins: null
};

export default function Admins(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_ADMINS:
      return {
        ...state,
        admins: action.payload
      };

    default:
      return state;
  }
}
