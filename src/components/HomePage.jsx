import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div>
        <center>
          <span className="brain">🧠</span>
          <p className="title">Take your Quiz!</p>
          <Link to={localStorage.token ? "/quizzes" : "/users/login"}>
            <button className="button is-success">GET STARTED</button>
          </Link>
        </center>
      </div>
    </>
  );
};

export default HomePage;
