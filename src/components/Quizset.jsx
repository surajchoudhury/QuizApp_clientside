import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { MdQuestionAnswer } from "react-icons/md";
import Loader from "../components/Loader";
import {
  AiOutlinePlayCircle,
  AiOutlinePlus,
  AiOutlinePlusCircle,
  AiOutlineDelete,
  AiOutlineEdit
} from "react-icons/ai";
import { FaBook } from "react-icons/fa";
import {
  createQuizset,
  fetchQuestions,
  deleteQuizset,
  getQuizsetTopic,
  fetchQuizset,
  fetchQuizsetbyTopic
} from "../actions";

class Quizset extends React.Component {
  constructor() {
    super();
    this.state = {
      quizset: null
    };
    this.input = React.createRef();
  }

  handleChange = ({ target: { name, value } }) => {
    this.input.current.value = null;
    this.setState({ [name]: value });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.dispatch(createQuizset(this.state.quizset));
  };
  handleDelete = id => {
    this.props.dispatch(deleteQuizset(id));
  };
  render() {
    let quizsetno = 0;
    return (
      <>
        <div className="quizsets_container">
          <div className="arrow_container">
            <Link to="/" className="back_arrow">
              <p>←</p>
            </Link>
            <p className="signup">Quizsets</p>
          </div>
          <div className="quizsets_container_small">
            {this.props.isAdmin ? (
              <form className="quizset_form" onSubmit={this.handleSubmit}>
                <p className="add_quizset">
                  <AiOutlinePlus />
                  <FaBook />
                </p>

                <input
                  className="create_quizset"
                  name="quizset"
                  value={this.state.quizset}
                  onChange={this.handleChange}
                  placeholder="Create a quizset"
                  ref={this.input}
                />
              </form>
            ) : null}
            <ul className="quizset_container">
              {this.props.quizsets ? (
                this.props.quizsets.map(set => (
                  <li
                    className="quizset"
                    onClick={() =>
                      this.props.dispatch(fetchQuestions(set.topic))
                    }
                  >
                    <span className="quizset_no quizset_no_edit">{++quizsetno}</span>
                    <div className="quizset_content">
                      <span className="quizset_name">{set.topic}</span>
                      {this.props.isAdmin ? (
                        <div className="edit_quizset_container edit_quizset_container_edit">
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
                      <div className="quiz_count_container">
                        <span className="quiz_count">
                          <MdQuestionAnswer className="quiz_logo" />{" "}
                          {set.questions.length} Questions
                        </span>
                        {this.props.isAdmin ? (
                          <span className="play_button play_botton_edit">
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
                            <Link to="questions" className="add_question_link">
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

function mapStateToProps({ quizzes }) {
  return {
    quizsets: quizzes.quizsets && quizzes.quizsets.quizsets
  };
}

export default connect(mapStateToProps)(Quizset);
