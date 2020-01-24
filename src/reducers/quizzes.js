import { SET_QUIZZES, SET_QUIZSETS } from "../types";

let INITIAL_STATE = {
  quizzes: null,
  quizsets: null
};

export default function Quizzes(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_QUIZZES:
      return {
        ...state,
        quizzes: action.payload
      };
    case SET_QUIZSETS:
      return {
        ...state,
        quizsets: action.payload
      };
    default:
      return state;
  }
}
