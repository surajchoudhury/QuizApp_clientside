import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { MdQuestionAnswer } from "react-icons/md";
import Loader from "../components/Loader";
import { IoMdArrowRoundBack } from "react-icons/io";
import {
  AiOutlinePlayCircle,
  AiOutlinePlus,
  AiOutlinePlusCircle,
  AiOutlineDelete,
  AiOutlineEdit
} from "react-icons/ai";
import { FaBook } from "react-icons/fa";
import {
  fetchQuestions,
  getQuizsetTopic,
  fetchQuizset,
  fetchQuizsets,
  fetchQuizsetbyTopic
} from "../actions";

class Quizset extends React.Component {
  constructor() {
    super();
    this.state = {
      quizset: null,
      updating: false,
      showQuizset: false
    };
  }
  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.setState({ updating: true });
    fetch("/api/v1/quizsets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.token
      },
      body: JSON.stringify({
        topic: this.state.quizset
      })
    })
      .then(res => res.json())
      .then(quizset => {
        if (quizset.success) {
          this.setState({ updating: false, showQuizset: false });
          this.props.dispatch(fetchQuizsets());
        }
      });
  };
  handleDelete = id => {
    this.setState({ updating: true });
    fetch(`/api/v1/quizsets/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.token
      }
    })
      .then(res => res.json())
      .then(quizset => {
        if (quizset.success) {
          this.setState({ updating: false });
          this.props.dispatch(fetchQuizsets());
        }
      });
  };
  render() {
    let quizsetno = 0;
    return (
      <>
        <div className="quizsets_container">
          <div className="arrow_container">
            <Link to="/" className="back_arrow">
              <IoMdArrowRoundBack />
            </Link>
            <p className="signup">Quizsets</p>
          </div>
          <div className="quizsets_container_small">
            {this.props.isAdmin ? (
              <form className="quizset_form" onSubmit={this.handleSubmit}>
                <p
                  className="add_quizset"
                  onClick={() => this.setState({ showQuizset: true })}
                >
                  <AiOutlinePlus />
                  <FaBook />
                </p>

                <input
                  className={
                    this.state.showQuizset
                      ? " create_quizset_visible"
                      : "create_quizset"
                  }
                  name="quizset"
                  value={this.state.quizset}
                  onChange={this.handleChange}
                  placeholder="Type quizset and press ⏎ "
                />
              </form>
            ) : null}
            {this.state.updating ? <Loader /> : null}
            <ul className="quizset_container">
              {this.props.quizsets && this.props.user ? (
                this.props.quizsets.map(set => (
                  <li
                    className={
                      set.completedByUsers.includes(this.props.user._id)
                        ? "quizset_completed"
                        : "quizset"
                    }
                    onClick={() =>
                      this.props.dispatch(fetchQuestions(set.topic))
                    }
                  >
                    <p
                      className={
                        set.completedByUsers.includes(this.props.user._id)
                          ? "quizset_no_completed"
                          : "quizset_no "
                      }
                    >
                      {++quizsetno}
                    </p>
                    <div
                      className={
                        set.completedByUsers.includes(this.props.user._id)
                          ? "quizset_content_completed"
                          : "quizset_content"
                      }
                    >
                      <span
                        className={
                          set.completedByUsers.includes(this.props.user._id)
                            ? "quizset_name_completed"
                            : "quizset_name"
                        }
                      >
                        {set.topic}
                      </span>
                      {this.props.isAdmin ? (
                        <div className="edit_quizset_container">
                          ...
                          <span className="add_question">
                            <Link
                              to="/quizzes/new"
                              className="add_question_link"
                            >
                              <AiOutlinePlusCircle
                                onClick={() => {
                                  this.props.dispatch(
                                    getQuizsetTopic(set.topic)
                                  );
                                  this.props.dispatch(fetchQuizset(set));
                                }}
                              />
                            </Link>
                          </span>
                          <span className="delete_quizset">
                            <AiOutlineDelete
                              onClick={() => this.handleDelete(set._id)}
                            />
                          </span>
                        </div>
                      ) : null}

                      <div
                        className={
                          set.completedByUsers.includes(this.props.user._id)
                            ? "quiz_count_container_completed"
                            : "quiz_count_container"
                        }
                      >
                        <span
                          className={
                            set.completedByUsers.includes(this.props.user._id)
                              ? "quiz_count_completed"
                              : "quiz_count"
                          }
                        >
                          <MdQuestionAnswer className="quiz_logo" />{" "}
                          {set.questions.length} Questions
                        </span>
                        {this.props.isAdmin ? (
                          <span className="edit_button">
                            <Link
                              to="/quizzes/view"
                              className="add_question_link"
                            >
                              <AiOutlineEdit
                                onClick={() =>
                                  this.props.dispatch(
                                    fetchQuizsetbyTopic(set.topic)
                                  )
                                }
                              />
                            </Link>
                          </span>
                        ) : (
                          <span className="play_button">
                            <Link
                              to="questions"
                              className={
                                set.completedByUsers.includes(
                                  this.props.user._id
                                )
                                  ? "add_question_link_completed"
                                  : "add_question_link"
                              }
                            >
                              <AiOutlinePlayCircle
                                onClick={() =>
                                  this.props.dispatch(
                                    fetchQuizsetbyTopic(set.topic)
                                  )
                                }
                              />
                            </Link>
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <Loader />
              )}
            </ul>
          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps({ quizzes, users }) {
  return {
    quizsets: quizzes.quizsets && quizzes.quizsets.quizsets,
    user: users.user && users.user.user
  };
}

export default connect(mapStateToProps)(Quizset);
