import { SET_SCORE_TOPIC } from "../types";

let INITIAL_STATE = {
  score_toipc: null
};

function Score(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_SCORE_TOPIC:
      return {
        ...state,
        score_toipc: action.payload
      };
    default:
      return state;
  }
}

export default Score;
