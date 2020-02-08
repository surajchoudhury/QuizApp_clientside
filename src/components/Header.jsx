import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiBook } from "react-icons/fi";
import { GoGraph } from "react-icons/go";
import { AiOutlineHistory, AiOutlineUser } from "react-icons/ai";
import { fetchScores } from "../actions";
import { connect } from "react-redux";

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      activeNav: "home"
    };
  }

  handleNav = nav => {
    this.setState({ activeNav: nav });
  };

  publicHeader = () => {
    return (
      <>
        <div className="home">
          <Link
            activeClassName="header_item_active"
            className="navbar-item"
            to="/"
          >
            QuizApp
          </Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link
                activeClassName="header_item_active"
                className="button is-primary"
                to="/users/new"
              >
                <strong>Sign up</strong>
              </Link>
              <Link
                activeClassName="header_item_active"
                className="button is-light"
                to="/users/login"
              >
                Login
              </Link>
              <Link
                activeClassName="header_item_active"
                className="button is-light my_admin_button"
                to="/admins/login"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  };

  protectedHeader = isAdmin => {
    return (
      <>
        <div className="header_items">
          <Link
            className={
              this.state.activeNav === "home"
                ? "header_item_active"
                : "header_item"
            }
            to="/"
            onClick={() => this.handleNav("home")}
          >
            <FiHome />
          </Link>
          <Link
            className={
              this.state.activeNav === "new_quiz"
                ? "header_item_active"
                : "header_item"
            }
            to="/quizsets"
            onClick={() => this.handleNav("new_quiz")}
          >
            <FiBook />
          </Link>
          {!isAdmin ? (
            <Link
              className={
                this.state.activeNav === "score"
                  ? "header_item_active"
                  : "header_item"
              }
              to="/score"
              onClick={() => this.handleNav("score")}
            >
              <AiOutlineHistory />
            </Link>
          ) : null}
          <Link
            to="/scores"
            className={
              this.state.activeNav === "progress"
                ? "header_item_active"
                : "header_item"
            }
            onClick={() => {
              this.handleNav("progress");
              this.props.dispatch(fetchScores());
            }}
          >
            <GoGraph />
          </Link>
          <Link
            className={
              this.state.activeNav === "profile"
                ? "header_item_active"
                : "header_item"
            }
            to="/user"
            onClick={() => this.handleNav("profile")}
          >
            <AiOutlineUser />
          </Link>
        </div>
      </>
    );
  };

  render() {
    return (
      <>
        <nav className="header" role="navigation" aria-label="main navigation">
          {localStorage.token || this.props.isLogged
            ? this.protectedHeader(this.props.isAdmin)
            : this.publicHeader()}
        </nav>
      </>
    );
  }
}

export default connect()(Header);
