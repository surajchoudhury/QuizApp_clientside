import { SET_USERS, SET_SCORES, SET_SCORE, SET_USER } from "../types";

let INITIAL_STATE = {
  users: null,
  user: null,
  scores: null,
  score: null
};

export default function Users(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload
      };
    case SET_USER: {
      return {
        ...state,
        user: action.payload
      };
    }
    case SET_SCORES:
      return {
        ...state,
        scores: action.payload
      };
    case SET_SCORE:
      return {
        ...state,
        score: action.payload
      };

    default:
      return state;
  }
}
