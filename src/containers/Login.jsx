import React from "react";
import { withRouter, Link } from "react-router-dom";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      message: null,
      errors: {
        invalidUsername: null,
        invalidEmail: null,
        invalidPassword: null
      }
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  errorHandler = event => {
    event.preventDefault();
    if (!this.state.email && !this.state.password) {
      this.setState({
        invalidEmail: "Email can't be empty!",
        invalidPassword: "Password can't be empty!"
      });
    } else if (!this.state.email && this.state.password) {
      this.setState({ invalidEmail: "Email can't be empty!" });
    } else if (this.state.email && !this.state.password) {
      this.setState({ invalidPassword: "Password can't be empty!" });
    } else {
      this.userLogin();
    }
  };

  userLogin = () => {
    fetch(this.props.URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(user => {
        if (user.success) {
          localStorage.setItem("token", user.token);
          this.props.isLogged(true);
          this.props.currentUser();
          this.props.history.push("/");
        } else {
          this.setState({ message: user.message });
        }
      });
  };

  render() {
    return (
      <>
        <div className="signin_container">
        <Link to="/admins/login" className="admin_link">○</Link>
          <figure className="signin_fig_container">
            <img src="/images/signin.svg" alt="" srcset="" />
          </figure>
          <p className="Quizapp">Quiz App</p>
          <p className="login_user ">{this.props.text}</p>
          <form onSubmit={this.errorHandler} className="signin_form">
            <label className="label_invalid is-danger">{this.state.message}</label>{" "}
          
            <label className="label_email ">Email</label>{" "}
            <label className="incorrect_container">
              <label className="label_incorrect is-danger">
                {!this.state.email ? this.state.invalidEmail : ""}
              </label>
            </label>
            <input
              className={
                !this.state.email && this.state.invalidEmail
                  ? "input_signin is-false"
                  : "input_signin is-success"
              }
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder="Enter your email"
            />
            <label className="label_password ">Password</label>
            <label className="incorrect_container">
              <label className="label_incorrect is-danger">
                {!this.state.password ? this.state.invalidPassword : ""}
              </label>
            </label>
            <input
              className={
                !this.state.password && this.state.invalidPassword
                  ? "input_signin is-false"
                  : "input_signin is-success"
              }
              type="password"
              name="password"
              value={this.state.password}
              placeholder="Enter your password"
              onChange={this.handleChange}
            />
            <p className="control ">
              <button className="button_signin is-success" type="submit">
                Sign in
              </button>
            </p>
          </form>
          <p className="register_here">
            Dont have an account?{" "}
            <Link to="/users/new">
              <small className="register_now">Register now</small>
            </Link>
          </p>
        </div>
      </>
    );
  }
}

export default withRouter(Login);
