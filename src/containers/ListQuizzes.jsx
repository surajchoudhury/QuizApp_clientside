import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import {
  deleteQuestion,
  updateQuizset,
  fetchQuizsetbyTopic,
  fetchQuizsets
} from "../actions";
import { IoMdArrowRoundBack } from "react-icons/io";
import { GiCircle } from "react-icons/gi";
import { FaDotCircle } from "react-icons/fa";

// relative
import Loader from "../components/Loader";
import { getQuestionId } from "../actions";

class ListQuizzes extends React.Component {
  constructor() {
    super();
    this.state = { topic: null, updating: false };
  }

  onChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  updateTopic = event => {
    event.preventDefault();
    this.props.dispatch(
      updateQuizset(
        this.props.quizset._id,
        this.state.topic,
        this.props.history
      )
    );
  };
  handleDelete = (topic, id) => {
    this.setState({ updating: true });
    fetch(`/api/v1/quizsets/${topic}/question/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.token
      }
    })
      .then(res => res.json())
      .then(quizset => {
        if (quizset.success) {
          this.props.dispatch(fetchQuizsetbyTopic(topic));
          this.props.dispatch(fetchQuizsets());
          this.setState({ updating: false });
        }
      });
  };
  render() {
    let quizsetno = 0;
    let { dispatch } = this.props;

    return (
      <>
        {this.props.quizset ? (
          <section className="question_container_big">
            <div className="arrow_container">
              <Link to="/quizsets" className="back_arrow">
                <IoMdArrowRoundBack />
              </Link>
              <form onSubmit={this.updateTopic}>
                <input
                  className="signup input_quizset_edit"
                  placeholder={this.props.quizset.topic}
                  name="topic"
                  value={this.state.topic}
                  onChange={this.onChange}
                />
              </form>
            </div>
            {this.state.updating ? <Loader /> : null}
            <ul className="questions_container">
              {this.props.quizset.questions.map(question => (
                <li className="quizset question">
                  <span className="questions_no">{++quizsetno}</span>
                  <div className="quizset_content questions_content">
                    <span className="quizset_name question_name">
                      {question.question}
                    </span>
                    {this.props.isAdmin ? (
                      <div className="options_container">
                        <span className="option1">
                          <span className="dots">
                            {question.answer === question.options.A ? (
                              <FaDotCircle />
                            ) : (
                              <GiCircle />
                            )}
                          </span>{" "}
                          <span className="question_option">
                            {question.options.A}
                          </span>
                        </span>
                        <span className="option1">
                          <span className="dots">
                            {question.answer === question.options.B ? (
                              <FaDotCircle />
                            ) : (
                              <GiCircle />
                            )}
                          </span>{" "}
                          <span className="question_option">
                            {question.options.B}
                          </span>
                        </span>
                        <span className="option1">
                          <span className="dots">
                            {question.answer === question.options.C ? (
                              <FaDotCircle />
                            ) : (
                              <GiCircle />
                            )}
                          </span>{" "}
                          <span className="question_option">
                            {question.options.C}
                          </span>
                        </span>
                        <span className="option1">
                          <span className="dots">
                            {question.answer === question.options.D ? (
                              <FaDotCircle />
                            ) : (
                              <GiCircle />
                            )}
                          </span>{" "}
                          <span className="question_option">
                            {question.options.D}
                          </span>
                        </span>
                      </div>
                    ) : null}
                    {this.props.isAdmin ? (
                      <div className="edit_quizset_container edit_questions_container">
                        ...
                        <span className="add_question">
                          <Link
                            to="/quizzes/edit"
                            className="add_question_link edit_questions_link"
                          >
                            <AiOutlineEdit
                              onClick={() =>
                                dispatch(getQuestionId(question._id))
                              }
                            />
                          </Link>
                        </span>
                        <span className="delete_quizset delete_question_link">
                          <AiOutlineDelete
                            onClick={
                              () =>
                                this.handleDelete(
                                  this.props.quizset.topic,
                                  question._id
                                )
                              // dispatch(
                              //   deleteQuestion(
                              //     this.props.quizset.topic,
                              //     question._id
                              //   )
                              // )
                            }
                          />
                        </span>
                      </div>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <Loader />
        )}
      </>
    );
  }
}

function mapStateTorops({ quizset }) {
  return {
    quizset: quizset.quizsetByTopic && quizset.quizsetByTopic.quizset
  };
}
export default connect(mapStateTorops)(withRouter(ListQuizzes));
