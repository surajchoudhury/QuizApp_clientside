import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { TiDelete, TiEdit } from "react-icons/ti";

class Quiz extends React.Component {
  constructor() {
    super();

    this.state = {
      result: null,
      answer: null,
      scoreCount: 0
    };
  }

  deleteQuiz = id => {
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
          this.props.updateState();
        }
      });
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
        score: this.state.scoreCount
      })
    })
      .then(res => res.json())
      .then(user => {
        if (user.success) {
          console.log(user);
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
            <p className="score_count">Score : {this.state.scoreCount}</p>
            <form onSubmit={this.updateUserResult}>
              <div className="container">
                {this.props.quizzes &&
                  this.props.quizzes.map((quiz, i) => (
                    <>
                      <div data-id={++id} className="center" ref={this.view}>
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
                              onClick={() => this.deleteQuiz(quiz._id)}
                            />
                          </>
                        ) : null}
                        <h2 className="subtitle my_subtitle">
                          {quiz.question}
                        </h2>
                        <div className="options_container">
                          {quiz.options.split(",").map(option => (
                            <>
                              <p
                                className={"option"}
                                onClick={event =>
                                  this.getResult(event, quiz.answer, i)
                                }
                              >
                                {option}
                              </p>
                            </>
                          ))}
                        </div>
                      </div>
                    </>
                  ))}
                  <button className="button is-light" type="submit" >Submit</button>
              </div>
            </form>
          </div>
        </section>
      </>
    );
  }
}

export default connect()(Quiz);
