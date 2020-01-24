import React from "react";
import { withRouter } from "react-router-dom";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
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
        }
      });
  };

  render() {
    return (
      <>
        <div className="container my_container">
          <form onSubmit={this.errorHandler}>
            <div className="field">
              <label className="label">{this.props.text}</label>
              <label className="label">Email</label>{" "}
              <div className="control has-icons-left has-icons-right">
                <input
                  className={
                    !this.state.email && this.state.invalidEmail
                      ? "input is-danger"
                      : "input is-success"
                  }
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  placeholder="Enter your email"
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
                  value={this.state.password}
                  placeholder="Enter your password"
                  onChange={this.handleChange}
                />
              </div>
              <p className="help is-danger">
                {!this.state.password ? this.state.invalidPassword : ""}{" "}
              </p>
            </div>
            <div className="field">
              <p className="control">
                <button className="button is-success" type="submit">
                  Login
                </button>
              </p>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default withRouter(Login);
