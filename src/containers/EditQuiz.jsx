import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { MdUpdate } from "react-icons/md";
import { editQuestion } from "../actions";
import { LoaderSmall } from "../components/Loader";
import Loader from "../components/Loader";
import { IoMdArrowRoundBack, IoMdCheckmarkCircle } from "react-icons/io";

class EditQuiz extends React.Component {
  constructor() {
    super();

    this.state = {
      question: null,
      answer: null,
      A: null,
      B: null,
      C: null,
      D: null,
      quizset: null,
      updating: false,
      err: null
    };
  }

  componentDidMount() {
    fetch(`/api/v1/quizzes/${this.props.questionId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.token
      }
    })
      .then(res => res.json())
      .then(question => {
        if (question.success) {
          this.setState({
            question: question.question.question,
            answer: question.question.answer,
            A: question.question.options.A,
            B: question.question.options.B,
            C: question.question.options.C,
            D: question.question.options.D,
            quizset: question.question.quizset
          });
        }
      });
  }

  onChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value, err: null });
  };

  editQuiz = event => {
    event.preventDefault();
    this.props.dispatch(
      editQuestion(
        this.props.questionId,
        this.state.question,
        this.state.answer,
        this.state.A,
        this.state.B,
        this.state.C,
        this.state.D,
        this.props.history,
        this.state.quizset
      )
    );
  };

  checkProgress = () => {
    if (
      this.state.question &&
      !this.state.A &&
      !this.state.B &&
      !this.state.C &&
      !this.state.D &&
      !this.state.answer
    ) {
      return "filled filled1";
    } else if (
      this.state.question &&
      this.state.A &&
      !this.state.B &&
      !this.state.C &&
      !this.state.D &&
      !this.state.answer
    ) {
      return "filled filled2";
    } else if (
      this.state.question &&
      this.state.A &&
      this.state.B &&
      !this.state.C &&
      !this.state.D &&
      !this.state.answer
    ) {
      return " filled filled3";
    } else if (
      this.state.question &&
      this.state.A &&
      this.state.B &&
      this.state.C &&
      !this.state.D &&
      !this.state.answer
    ) {
      return "filled filled4";
    } else if (
      this.state.question &&
      this.state.A &&
      this.state.B &&
      this.state.C &&
      this.state.D &&
      !this.state.answer
    ) {
      return "filled filled5";
    } else if (
      this.state.question &&
      this.state.A &&
      this.state.B &&
      this.state.C &&
      this.state.D &&
      this.state.answer
    ) {
      return "filled filled6";
    } else {
      return "filled";
    }
  };

  handleUpdate = event => {
    if (
      this.state.question &&
      this.state.A &&
      this.state.B &&
      this.state.C &&
      this.state.D &&
      this.state.D &&
      !this.state.err &&
      this.state.answer
    ) {
      this.setState({ updating: true });
      this.editQuiz(event);
    } else {
      this.setState({ updating: false, err: "⚠︎ Must fill all the fields!" });
    }
  };

  render() {
    return (
      <>
        {this.state.question ||
        this.state.A ||
        this.state.B ||
        this.state.C ||
        this.state.D ||
        this.state.answer ? (
          <div className="signup_container">
            <div className="arrow_container">
              <Link to="/quizsets" className="back_arrow">
                <IoMdArrowRoundBack />
              </Link>
              <p className="signup">Question</p>
            </div>
            <p className="question_no">
              <MdUpdate
                className={
                  this.state.question &&
                  this.state.A &&
                  this.state.B &&
                  this.state.C &&
                  this.state.D &&
                  this.state.answer
                    ? "updated"
                    : "update"
                }
              />
            </p>
            <p
              className={
                this.state.question &&
                this.state.A &&
                this.state.B &&
                this.state.C &&
                this.state.D &&
                this.state.answer
                  ? "tick tick2"
                  : "tick"
              }
            >
              <IoMdCheckmarkCircle />
            </p>
            <div className="progress_container_question">
              <p className={this.checkProgress()}></p>
            </div>
            <form className="new_question_form">
              <div class="control">
                <textarea
                  className="textarea_question"
                  name="question"
                  placeholder={`Edit the question for ${this.state.quizset}`}
                  onChange={this.onChange}
                  value={this.state.question}
                ></textarea>
              </div>
              <label
                className={
                  this.state.err ? "label_options_err" : "label_options"
                }
              >
                {this.state.err ? this.state.err : "Options"}
              </label>

              <input
                className="input_question is-primary"
                type="text"
                name="A"
                onChange={this.onChange}
                value={this.state.A}
                placeholder="A"
              />
              <input
                className="input_question  is-primary"
                type="text"
                name="B"
                onChange={this.onChange}
                value={this.state.B}
                placeholder="B"
              />
              <input
                className="input_question  is-primary"
                type="text"
                name="C"
                onChange={this.onChange}
                value={this.state.C}
                placeholder="C"
              />
              <input
                className="input_question  is-primary"
                type="text"
                name="D"
                onChange={this.onChange}
                value={this.state.D}
                placeholder="D"
              />
              <select
                className="select_question"
                name="answer"
                onChange={this.onChange}
                value={this.state.answer}
              >
                <option>{this.state.A}</option>
                <option>{this.state.B}</option>
                <option>{this.state.C}</option>
                <option>{this.state.D}</option>
              </select>
              <button
                className={
                  this.state.updating
                    ? "button_signup update_loading "
                    : "button_signup"
                }
                onClick={this.handleUpdate}
              >
                {" "}
                <span className="update_question">Update</span>{" "}
                {this.state.updating ? <LoaderSmall /> : null}
              </button>
            </form>
          </div>
        ) : (
          <Loader />
        )}
      </>
    );
  }
}

function mapStateToProps({ quizzes }) {
  return {
    questionId: quizzes.questionId
  };
}

export default connect(mapStateToProps)(withRouter(EditQuiz));
