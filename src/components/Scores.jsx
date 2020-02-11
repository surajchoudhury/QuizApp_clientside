import React from "react";
import { connect } from "react-redux";
import Loader from "./Loader";

const Score = props => {
  let sino = 0;

  return (
    <>
      {props.scores && props.user ? (
        <section className=" scores_container">
          <figure className="scores_fig">
            <img className="win_img" src="/images/win.png" alt="" srcset="" />
          </figure>
          <section className="scores_container_small">
            <p className="scores">Rank</p>
            <p className="scores player">Player</p>
            <p className="scores score">Score</p>
            <p className="scores">Quizset</p>
          </section>
          <div className="all_score_container">
            {props.scores.scores.map(score => (
              <div
                className={
                  props.user && props.user.user.username === score.user.username
                    ? "main_container username_score"
                    : "main_container"
                }
              >
                <p
                  className={
                    props.user &&
                    props.user.user.username === score.user.username
                      ? "rank my_rank"
                      : "rank"
                  }
                >
                  {++sino}
                </p>
                <p className="username_cont_score">
                  <figure className="score_img_user">
                    <img src={score.user.profile} alt="" srcset="" />
                  </figure>
                  <p className="username_scores">{score.user.username}</p>
                </p>

                <p className="score_scores">{score.score}</p>
                <p className="quizset_scores">{score.quizset}</p>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
};
const mapStateToProps = state => {
  return {
    scores: state.users.scores,
    user: state.users.user
  };
};

export default connect(mapStateToProps)(Score);
