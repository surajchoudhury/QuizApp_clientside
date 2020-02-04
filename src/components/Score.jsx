import React from "react";
import { connect } from "react-redux";

const Score = props => {
  let sino = 0;
  return (
    <>
      <section className="container scores_cont">
        <section className="scores_container">
          <p className="scor">SI.NO</p>
          <p className="scor">Quizset</p>
          <p className="scor">Score</p>
          <p className="scor">Created At</p>
        </section>
        {props.score &&
          props.score.score.map(score => (
            <div className="main_container">
              <p className="si_no">{++sino}</p>
              <p className="quizset_name">{score.quizset}</p>
              <p className="score_container">{score.score}</p>
              <p className="created_at">{score.createdAt}</p>
            </div>
          ))}
      </section>
    </>
  );
};

function mapStateToProps(state) {
  return {
    score: state.users.score
  };
}
export default connect(mapStateToProps)(Score);
