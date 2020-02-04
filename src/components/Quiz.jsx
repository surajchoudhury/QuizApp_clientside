import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { TiDelete, TiEdit } from "react-icons/ti";
import { fetchScores, fetchScore } from "../actions";

class Quiz extends React.Component {
  constructor() {
    super();

    this.state = {
      result: null,
      answer: null,
      scoreCount: 0
    };
    this.view = React.createRef();
  }

  deleteQuiz = (id, quizset) => {
    fetch(`http://localhost:3000/api/v1/quizzes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.token
      }
    })
      .then(res => res.json())
      .then(quiz => {
        if (quiz.success) {
          this.props.updateState(quizset);
        }
      });
  };

  getScores = () => {
    this.props.dispatch(fetchScores());
  };

  updateUserResult = event => {
    event.preventDefault();
    fetch("http://localhost:3000/api/v1/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.token
      },
      body: JSON.stringify({
        score: this.state.scoreCount,
        quizset: this.props.questions.questions[0].quizset
      })
    })
      .then(res => res.json())
      .then(user => {
        if (user.success) {
          this.props.currentUser();
          this.props.dispatch(fetchScore());
          this.props.history.push("/score");
        }
      });
  };

  getResult = (event, answer, i) => {
    let target = event.target.parentElement.parentElement;
    let dataId = event.target.parentElement.parentElement.dataset.id;
    this.setState({ result: event.target.textContent, answer }, () => {
      this.resultCount();
      this.testView(dataId, i, target);
    });
  };

  testView = (id, i, target) => {
    if (parseInt(id) === i) {
      if (this.state.result && !this.state.result.includes(this.state.answer)) {
        return (target.className = "center option-wrong");
      } else if (
        this.state.result &&
        this.state.result.includes(this.state.answer)
      ) {
        return (target.className = "center option-correct");
      } else {
        return "center";
      }
    }
  };

  resultCount = () => {
    if (this.state.result.includes(this.state.answer)) {
      this.setState({ scoreCount: this.state.scoreCount + 1 });
    }
  };

  render() {
    let id = -1;
    return (
      <>
        <section className="hero ">
          <div className="hero-body">
            <Link to="/scores">
              <p className="score_count prev_score" onClick={this.getScores}>
                Score Board
              </p>
            </Link>
            <p className="score_count">Score : {this.state.scoreCount}</p>
            <form onSubmit={this.updateUserResult}>
              <div className="container" ref={this.view}>
                {this.props.questions &&
                this.props.questions.questions.length ? (
                  this.props.questions.questions.map((quiz, i) => (
                    <>
                      <div data-id={++id} className="center">
                        {this.props.isAdmin ? (
                          <>
                            <Link to="/quizzes/edit">
                              <TiEdit
                                className="edit_quiz"
                                onClick={() => this.props.getQuizId(quiz._id)}
                              />
                            </Link>
                            <TiDelete
                              className="delete_quiz"
                              onClick={() =>
                                this.deleteQuiz(quiz._id, quiz.quizset)
                              }
                            />
                          </>
                        ) : null}
                        <h2 className="subtitle my_subtitle">
                          {quiz.question}
                        </h2>
                        <div className="options_container">
                          <>
                            <p
                              className={"option"}
                              onClick={event =>
                                this.getResult(event, quiz.answer, i)
                              }
                            >
                              {quiz.options.A}
                            </p>
                            <p
                              className={"option"}
                              onClick={event =>
                                this.getResult(event, quiz.answer, i)
                              }
                            >
                              {quiz.options.B}
                            </p>
                            <p
                              className={"option"}
                              onClick={event =>
                                this.getResult(event, quiz.answer, i)
                              }
                            >
                              {quiz.options.C}
                            </p>
                            <p
                              className={"option"}
                              onClick={event =>
                                this.getResult(event, quiz.answer, i)
                              }
                            >
                              {quiz.options.D}
                            </p>
                          </>
                        </div>
                      </div>
                    </>
                  ))
                ) : (
                  <p className="select-quiz">
                    <span> 👈🏻 </span> Please select a quizset <span>👨🏼‍🏫 </span>
                  </p>
                )}
                {this.props.questions &&
                this.props.questions.questions.length &&
                !this.props.isAdmin ? (
                  // <Link to="/score">
                  <button className="button is-light" type="submit">
                    Submit
                  </button>
                ) : // </Link>
                null}
              </div>
            </form>
          </div>
        </section>
      </>
    );
  }
}

function mapStateToProps({ quizzes }) {
  return {
    questions: quizzes.questions
  };
}

export default connect(mapStateToProps)(withRouter(Quiz));
