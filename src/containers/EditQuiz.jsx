import React from "react";
import { withRouter } from "react-router-dom";

class EditQuiz extends React.Component {
  constructor() {
    super();
    this.state = {
      question: null,
      answer: null,
      options: null,
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
      .then(quiz => {
        if (quiz.success) {
          this.setState({
            question: quiz.quiz.question,
            answer: quiz.quiz.answer,
            options: quiz.quiz.options,
            quizset: quiz.quiz.quizset
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
        options: this.state.options,
        quizset: this.state.quizset
      })
    })
      .then(res => res.json())
      .then(quiz => {
        if (quiz.success) {
          this.props.updateState();
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
                  placeholder="Enter quiz name -- "
                  onChange={this.onChange}
                  value={this.state.question}
                ></textarea>
              </div>
            </div>
            <div class="field">
              <label class="label">Options</label>
              <div class="control">
                <textarea
                  class="textarea  is-small is-primary"
                  type="text"
                  name="options"
                  onChange={this.onChange}
                  value={this.state.options}
                  placeholder="Options"
                ></textarea>
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

export default withRouter(EditQuiz);
