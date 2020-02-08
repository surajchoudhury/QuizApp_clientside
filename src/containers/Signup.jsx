import React from "react";
import { withRouter, Link } from "react-router-dom";
// import { MdArrowBack } from "react-icons/md";

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      email: null,
      password: null,
      progress: null,
      errors: {
        invalidUsername: null,
        invalidEmail: null,
        invalidPassword: null
      }
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.checkProgress());
  };

  errorHandler = event => {
    event.preventDefault();
    if (!this.state.username && !this.state.email && !this.state.password) {
      this.setState({
        invalidUsername: "Username can't be empty",
        invalidEmail: "Email can't be empty!",
        invalidPassword: "Password can't be empty!"
      });
    } else if (
      !this.state.username &&
      this.state.email &&
      this.state.password
    ) {
      this.setState({ invalidUsername: "Username can't be empty!" });
    } else if (
      this.state.username &&
      !this.state.email &&
      this.state.password
    ) {
      this.setState({ invalidEmail: "Email can't be empty!" });
    } else if (
      this.state.username &&
      this.state.email &&
      !this.state.password
    ) {
      this.setState({ invalidPassword: "Password can't be empty!" });
    } else if (
      !this.state.username &&
      !this.state.email &&
      this.state.password
    ) {
      this.setState({
        invalidUsername: "Username can't be empty!",
        invalidEmail: "Email can't be empty!"
      });
    } else if (
      this.state.username &&
      !this.state.email &&
      !this.state.password
    ) {
      this.setState({
        invalidEmail: "Email can't be empty!",
        invalidPassword: "Password can't be empty!"
      });
    } else if (
      !this.state.username &&
      this.state.email &&
      !this.state.password
    ) {
      this.setState({
        invalidUsername: "Username can't be empty!",
        invalidPassword: "Password can't be empty!"
      });
    } else if (!this.state.email.includes(".com")) {
      this.setState({ invalidEmail: "Invalid email format" });
    } else {
      this.newUser();
    }
  };

  newUser = () => {
    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(user => {
        if (user.success) {
          this.props.history.push("/users/login");
        }
      });
  };

  checkProgress = () => {
    if (this.state.username && !this.state.email && !this.state.password) {
      return "progress progress1";
    } else if (
      this.state.username &&
      this.state.email &&
      !this.state.password
    ) {
      return "progress progress2";
    } else if (this.state.username && this.state.email && this.state.password) {
      return "progress progress3";
    } else {
      return "progress";
    }
  };

  render() {
    return (
      <>
        <div className="signup_container">
          <div className="arrow_container">
            <Link to="/users/login" className="back_arrow">
              <p>←</p>
            </Link>
            <p className="signup">Sign Up</p>
          </div>
          <div className="progress_container">
            <span className={this.checkProgress()}></span>
          </div>
          <p className="introduce_signup">Introduce Yourself</p>
          <p className="enter_details">Enter username,email and password</p>
          <figure className="singup_img">
            <img src="/images/signup.svg" alt="" srcset="" />
          </figure>
          <form onSubmit={this.errorHandler} className="signup_form">
            <label className="label_email ">Username</label>
            <label className="incorrect_container">
              <p className="label_incorrect is-danger">
                {!this.state.username ? this.state.invalidUsername : ""}
              </p>
            </label>
            <input
              className={
                !this.state.username && this.state.invalidUsername
                  ? "input_signin is-false"
                  : "input_signin is-success"
              }
              type="text"
              name="username"
              placeholder="Enter your username"
              value={this.state.username}
              onChange={this.handleChange}
            />

            <label className="label_email">Email</label>
            <label className="incorrect_container">
              <p className="label_incorrect is-danger">
                {!this.state.email || !this.state.email.includes(".com")
                  ? this.state.invalidEmail
                  : ""}
              </p>
            </label>
            <input
              className={
                !this.state.email && this.state.invalidEmail
                  ? "input_signin is-false"
                  : "input_signin is-success"
              }
              type="email"
              name="email"
              placeholder="Enter your email"
              value={this.state.email}
              onChange={this.handleChange}
            />

            <label className="label_email">Password</label>
            <label className="incorrect_container">
              <p className="label_incorrect is-danger">
                {!this.state.password ? this.state.invalidPassword : ""}{" "}
              </p>
            </label>
            <input
              className={
                !this.state.password && this.state.invalidPassword
                  ? "input_signin is-false"
                  : "input_signin is-success"
              }
              type="password"
              name="password"
              placeholder="Enter your password"
              value={this.state.password}
              onChange={this.handleChange}
            />

            <button className="button_signup is-success" type="submit">
              Continue
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default withRouter(Signup);
