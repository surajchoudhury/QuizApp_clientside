import React from "react";
import { withRouter } from "react-router-dom";

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      email: null,
      password: null,
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
  render() {
    return (
      <>
        <div className="container my_container">
          <form onSubmit={this.errorHandler}>
            <div className="field">
              <label className="label">Username</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className={
                    !this.state.username && this.state.invalidUsername
                      ? "input is-danger"
                      : "input is-success"
                  }
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user"></i>
                </span>
                <span className="icon is-small is-right">
                  <i className="fas fa-check"></i>
                </span>
              </div>
              <p className="help is-danger">
                {!this.state.username ? this.state.invalidUsername : ""}
              </p>
            </div>

            <div className="field">
              <label className="label">Email</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className={
                    !this.state.email && this.state.invalidEmail
                      ? "input is-danger"
                      : "input is-success"
                  }
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
                <span className="icon is-small is-right">
                  <i className="fas fa-exclamation-triangle"></i>
                </span>
              </div>
              <p className="help is-danger">
                {!this.state.email ? this.state.invalidEmail : ""}
              </p>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className={
                    !this.state.password && this.state.invalidPassword
                      ? "input is-danger"
                      : "input is-success"
                  }
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
                <span className="icon is-small is-right">
                  <i className="fas fa-exclamation-triangle"></i>
                </span>
              </div>
              <p className="help is-danger">
                {!this.state.password ? this.state.invalidPassword : ""}{" "}
              </p>
            </div>
            <div className="field">
              <p className="control">
                <button className="button is-success" type="submit">
                  Signup
                </button>
              </p>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default withRouter(Signup);
