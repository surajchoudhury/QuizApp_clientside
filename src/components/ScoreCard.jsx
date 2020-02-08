import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Loader from "./Loader";
import { fetchScores } from "../actions";

const ScoreCard = props => {
  return (
    <>
      {props.score ? (
        <section className="score_card_container">
          <figure className="score_figure">
            <img src="/images/winners.svg" alt="" srcset="" />
          </figure>
          <p className="congo">Congratulations</p>
          <p className="completed_score">You have successfully completed</p>
          <p className="model_name">
            {props.score ? props.score.topic : "no quiz"}
          </p>
          <p className="score_scorecard">
            score : {props.score ? props.score.score : 0}
          </p>
          <div className="scorecard_buttons_container">
            <Link to="/scores">
              <button
                className="button_signin button_scorecard"
                onClick={() => props.dispatch(fetchScores())}
              >
                View Leaderboard
              </button>
            </Link>
            <Link to="/quizsets">
              <button className="button_signin button_scorecard">
                Start New Quiz
              </button>
            </Link>
          </div>
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
};

function mapStateToProps({ score }) {
  return {
    score: score.score_toipc
  };
}

export default connect(mapStateToProps)(ScoreCard);
