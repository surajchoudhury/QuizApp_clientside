import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { getScoreTopic, updateScore, completedByUsers } from "../actions";
import {IoMdArrowRoundBack} from 'react-icons/io'

class PlayQuiz extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: false,
      activeIndex: 0,
      activeOption: null
    };
    this.score = 0;
  }

  handlePage = () => {
    this.setState({
      activeIndex: ++this.state.activeIndex,
      selected: false,
      activeOption: null
    });
  };

  verifyAnswer = (option, answer) => {
    if (option === answer) {
      this.score++;
      this.setState({
        activeOption: option,
        selected: true
      });
    } else {
      this.setState({ activeOption: option, selected: true });
    }
  };
  submitAnswer = (score, topic) => {
    this.props.dispatch(
      getScoreTopic({
        score,
        topic
      })
    );
    this.props.dispatch(updateScore(score, topic));
    if (!this.props.quizset.completedByUsers.includes(this.props.user._id)) {
      this.props.dispatch(completedByUsers(topic));
    }
  };

  render() {
    let questionSet =
      this.props.quizset &&
      this.props.quizset.questions.length &&
      this.props.quizset.questions[this.state.activeIndex];
    return (
      <>
        {this.props.quizset ? (
          <div className="play_quiz_container">
            <div className="play_quiz_container_small">
              <div className="arrow_container">
                <Link to="/quizsets" className="back_arrow back_arrow_playquiz">
                  <IoMdArrowRoundBack />
                </Link>
                <p className="signup top_content_plazquiz">
                  {this.props.quizset.topic}
                </p>
              </div>
              <p className="question_count_play_quiz">
                Question <span>{this.state.activeIndex + 1}</span>
                <span>/{this.props.quizset.questions.length}</span>
                <p className="question_title">
                  {this.props.quizset.questions.length
                    ? questionSet.question
                    : "No questions yet!"}
                </p>
              </p>
            </div>
            <section
              className={
                this.state.selected
                  ? "questions_container_playquiz_disable"
                  : "questions_container_playquiz"
              }
            >
              {this.props.quizset.questions.length ? (
                <>
                  <button
                    className={
                      this.state.activeOption === questionSet.options.A
                        ? "option_quizplay active_option"
                        : "option_quizplay"
                    }
                    onClick={() =>
                      this.verifyAnswer(
                        questionSet.options.A,
                        questionSet.answer
                      )
                    }
                  >
                    {questionSet.options.A}
                  </button>
                  <button
                    className={
                      this.state.activeOption === questionSet.options.B
                        ? "option_quizplay active_option"
                        : "option_quizplay"
                    }
                    onClick={() =>
                      this.verifyAnswer(
                        questionSet.options.B,
                        questionSet.answer
                      )
                    }
                  >
                    {questionSet.options.B}
                  </button>
                  <button
                    className={
                      this.state.activeOption === questionSet.options.C
                        ? "option_quizplay active_option"
                        : "option_quizplay"
                    }
                    onClick={() =>
                      this.verifyAnswer(
                        questionSet.options.C,
                        questionSet.answer
                      )
                    }
                  >
                    {questionSet.options.C}
                  </button>
                  <button
                    className={
                      this.state.activeOption === questionSet.options.D
                        ? "option_quizplay active_option"
                        : "option_quizplay"
                    }
                    onClick={() =>
                      this.verifyAnswer(
                        questionSet.options.D,
                        questionSet.answer
                      )
                    }
                  >
                    {questionSet.options.D}
                  </button>
                </>
              ) : null}
            </section>

            {this.state.activeIndex ===
              this.props.quizset.questions.length - 1 && !this.props.isAdmin ? (
              <Link to="/questions/scorecard">
                <button
                  className="button_signup is-success"
                  onClick={() =>
                    this.submitAnswer(this.score, questionSet.quizset)
                  }
                >
                  Submit
                </button>
              </Link>
            ) : (
              <>
                {" "}
                {!this.props.isAdmin ? (
                  <button
                    className="button_signup is-success"
                    onClick={this.handlePage}
                  >
                    Next
                  </button>
                ) : (
                  <button className="button_signup is-success">
                    Admin can't Play
                  </button>
                )}
              </>
            )}
          </div>
        ) : (
          <Loader />
        )}
      </>
    );
  }
}
function mapStateToProps({ quizset, users }) {
  return {
    quizset: quizset.quizsetByTopic && quizset.quizsetByTopic.quizset,
    user: users.user && users.user.user
  };
}

export default connect(mapStateToProps)(PlayQuiz);
