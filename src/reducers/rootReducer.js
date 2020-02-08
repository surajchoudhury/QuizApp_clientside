import { combineReducers } from "redux";
import quizzes from "./quizzes";
import users from "./users";
import admins from "./admins";
import quizset from "./quizset";
import score from "./score";
const rootReducer = combineReducers({
  quizzes,
  users,
  admins,
  quizset,
  score
});

export default rootReducer;
