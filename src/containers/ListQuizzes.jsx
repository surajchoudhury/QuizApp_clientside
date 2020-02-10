import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { deleteQuestion, updateQuizset } from "../actions";

// relative
import Loader from "../components/Loader";
import { getQuestionId } from "../actions";

class ListQuizzes extends React.Component {
  render() {
    let quizsetno = 0;
    let { dispatch } = this.props;
    return (
      <>
        {this.props.quizset ? (
          <section className="question_container_big">
            <div className="arrow_container">
              <Link to="/quizsets" className="back_arrow">
                <p>←</p>
              </Link>
              <input
                className="signup"
                placeholder={this.props.quizset.topic}
              />
              {/* <p className="signup">{this.props.quizset.topic}</p> */}
            </div>
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
                            {question.answer === question.options.A ? "◉" : "○"}
                          </span>{" "}
                          {question.options.A}
                        </span>
                        <span className="option1">
                          <span className="dots">
                            {question.answer === question.options.B ? "◉" : "○"}
                          </span>{" "}
                          {question.options.B}
                        </span>
                        <span className="option1">
                          <span className="dots">
                            {question.answer === question.options.C ? "◉" : "○"}
                          </span>{" "}
                          {question.options.C}
                        </span>
                        <span className="option1">
                          <span className="dots">
                            {question.answer === question.options.D ? "◉" : "○"}
                          </span>{" "}
                          {question.options.D}
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
                            onClick={() =>
                              dispatch(
                                deleteQuestion(
                                  this.props.quizset.topic,
                                  question._id
                                )
                              )
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
export default connect(mapStateTorops)(ListQuizzes);
