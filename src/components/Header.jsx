import React from "react";
import { Link } from "react-router-dom";

const publicHeader = () => {
  return (
    <>
      <div className="navbar-start">
        <Link className="navbar-item" to="/">
          Home
        </Link>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <Link className="button is-primary" to="/users/new">
              <strong>Sign up</strong>
            </Link>
            <Link className="button is-light" to="/users/login">
              Log in
            </Link>
            <Link
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

const protectedHeader = isAdmin => {
  return (
    <>
      <div className="navbar-start">
        <Link className="navbar-item" to="/">
          Home
        </Link>
        {isAdmin ? (
          <Link className="navbar-item" to="/quizzes/new">
            {" "}
            New Quiz
          </Link>
        ) : (
          ""
        )}
         <Link className="navbar-item" to="/quizzes">
            List Quizzes
          </Link>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <Link className="button is-primary my_admin_button" to="/user">
            <strong>{isAdmin ? `Admin` : `User`}</strong>
          </Link>
        </div>
      </div>
    </>
  );
};

const Header = props => {
  return (
    <>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div id="navbarBasicExample" className="navbar-menu">
          {localStorage.token || props.isLogged
            ? protectedHeader(props.isAdmin)
            : publicHeader()}
        </div>
      </nav>
    </>
  );
};

export default Header;
