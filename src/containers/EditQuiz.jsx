import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

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
      quizset: null
    };
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/v1/quizzes/${this.props.quizId}`, {
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
    this.setState({ [name]: value });
  };

  editQuiz = event => {
    event.preventDefault();
    fetch(`http://localhost:3000/api/v1/quizzes/${this.props.quizId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.token
      },
      body: JSON.stringify({
        question: this.state.question,
        answer: this.state.answer,
        options: {
          A: this.state.A,
          B: this.state.B,
          C: this.state.C,
          D: this.state.D
        },
        quizset: this.state.quizset
      })
    })
      .then(res => res.json())
      .then(quiz => {
        if (quiz.success) {
          this.props.updateState(this.state.quizset);
          this.props.history.push("/quizzes");
        }
      });
  };

  render() {
    return (
      <>
        <div className="container my_container">
          <form onSubmit={this.editQuiz}>
            <div class="field">
              <label class="label">Question</label>
              <div class="control">
                <textarea
                  class="textarea"
                  name="question"
                  placeholder="Enter Question -- "
                  onChange={this.onChange}
                  value={this.state.question}
                ></textarea>
              </div>
            </div>
            <div class="field">
              <label class="label">Options</label>
              <div class="control">
                <input
                  class="input is-primary"
                  type="text"
                  name="A"
                  onChange={this.onChange}
                  value={this.state.A}
                  placeholder="A"
                />
                <input
                  class="input is-primary"
                  type="text"
                  name="B"
                  onChange={this.onChange}
                  value={this.state.B}
                  placeholder="B"
                />
                <input
                  class="input is-primary"
                  type="text"
                  name="C"
                  onChange={this.onChange}
                  value={this.state.C}
                  placeholder="C"
                />
                <input
                  class="input is-primary"
                  type="text"
                  name="D"
                  onChange={this.onChange}
                  value={this.state.D}
                  placeholder="D"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Answer</label>
              <div class="control">
                <input
                  class="input is-primary"
                  type="text"
                  name="answer"
                  onChange={this.onChange}
                  value={this.state.answer}
                  placeholder="Answer"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Topic</label>
              <div class="control">
                <input
                  class="input is-primary"
                  type="text"
                  name="quizset"
                  onChange={this.onChange}
                  value={this.state.quizset}
                  placeholder="Topic"
                />
              </div>
            </div>
            <button className="button is-success">Update</button>
          </form>
        </div>
      </>
    );
  }
}

function mapStateToProps({ quizzes }) {
  return {
    question: quizzes.question && quizzes.question.question
  };
}

export default connect(mapStateToProps)(withRouter(EditQuiz));
