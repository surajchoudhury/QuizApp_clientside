import {
  SET_QUIZZES,
  SET_QUIZSETS,
  SET_QUESTIONS,
  SET_QUESTION
} from "../types";

let INITIAL_STATE = {
  quizzes: null,
  quizsets: null,
  questions: null,
  question: null
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
    case SET_QUESTIONS:
      return {
        ...state,
        questions: action.payload
      };
    case SET_QUESTION:
      return {
        ...state,
        question: action.payload
      };
    default:
      return state;
  }
}
