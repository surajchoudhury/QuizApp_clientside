import React from "react";
import { connect } from "react-redux";

const Score = props => {
  let sino = 0;
  console.log(props.scores);
  return (
    <>
      <section className="container scores_cont">
        <section className="scores_container">
          <p className="scores">SI.NO</p>
          <p className="scores">Quizset</p>
          <p className="scores score">Top scores</p>
          <p className="scores">Scored by</p>
          <p className="scores">Created At</p>
        </section>
        {props.scores &&
          props.scores.scores.map(score => (
            <div className="main_container">
              <p className="si_no">{++sino}</p>
              <p className="quizset_name si">{score.quizset}</p>
              <p className="score_container">{score.score}</p>
              <p className="si_no">{score.user.username}</p>
              <p className="created_at">{score.createdAt}</p>
            </div>
          ))}
      </section>
    </>
  );
};
const mapStateToProps = state => {
  return {
    scores: state.users.scores
  };
};

export default connect(mapStateToProps)(Score);
