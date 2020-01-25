import React from "react";
import { connect } from "react-redux";


const Quizset = props => {
  return (
    <>
      <ul>
        {props.quizsets &&
          props.quizsets.map(set => (
            <li
              className="quizset"
              onClick={() =>
                props.quizzesbyQuizsets(set.topic ? set.topic : null)
              }
             
            >
              {set.topic ? set.topic : null} 
            </li>
          ))}
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
