import { SET_QUIZSETTOPIC, SET_QUIZSET, SET_QUESTION_BY_TOPIC } from "../types";

let INITIAL_STATE = {
  topic: null,
  quizset: null,
  quizsetByTopic: null
};

export default function Quizset(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_QUIZSETTOPIC:
      return {
        ...state,
        topic: action.payload
      };
    case SET_QUIZSET:
      return {
        ...state,
        quizset: action.payload
      };
    case SET_QUESTION_BY_TOPIC:
      return {
        ...state,
        quizsetByTopic: action.payload
      };

    default:
      return state;
  }
}
