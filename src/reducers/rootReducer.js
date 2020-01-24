import {  combineReducers } from "redux";
import quizzes from "./quizzes";
import users from "./users";
import admins from './admins';
const rootReducer = combineReducers({
  quizzes,
  users,
  admins
});

export default rootReducer;