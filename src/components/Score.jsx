import React from "react";
import { connect } from "react-redux";
import Loader from "../components/Loader";
import PieChart from './PieChart';

const Score = (props) => {
  let sino = 0;

  return (
    <>
      {props.score ? (
        <section className="scores_container">
          {/* <figure className="score_fig">
            <img
              className="win_img"
              src="/images/progress.svg"
              alt=""
              srcset=""
            />
          </figure> */}
          <PieChart />
          {/* <section className="scores_container_small2">
            <p className="scores">SI.NO</p>
            <p className="scores">Quizset</p>
            <p className="scores">Score</p>
            <p className="scores">Time</p>
          </section> */}
          {/* <div className="all_score_container all_score_container2">
            {props.score &&
              props.score.score.map((score) => (
                <div className="main_container main_container2">
                  <p className="rank ">{++sino}</p>
                  <p className="quizset_scores">{score.quizset}</p>
                  <p className="score_scores">{score.score}</p>
                  <p className="date_score">
                    {new Date(score.createdAt).toDateString()}
                  </p>
                </div>
              ))}
          </div> */}
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
};

function mapStateToProps(state) {
  return {
    score: state.users.score,
  };
}
export default connect(mapStateToProps)(Score);
