import React from "react";
import { connect } from "react-redux";
import { fetchQuestions } from "../actions/index";

const Quizset = props => {
  return (
    <>
      <ul className="quizset_container">
        {props.quizsets ? 
          props.quizsets.map(set => (
            <li
              className="quizset"
              onClick={() => props.dispatch(fetchQuestions(set.topic))}
            >
              {set.topic}
            </li>
          )):<p className="loading_small">Loading...</p>}
      </ul>
    </>
  );
};

function mapStateToProps({ quizzes }) {
  return {
    quizsets: quizzes.quizsets && quizzes.quizsets.quizsets
  };
}

export default connect(mapStateToProps)(Quizset);
