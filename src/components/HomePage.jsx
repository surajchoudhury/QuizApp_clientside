import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div className="homepage">
        <span className="brain"><img className="brain_img" src="/images/brain.svg" alt="" srcset=""/></span>
        <figure>
          {localStorage.token ? (
            <img src="/images/question.svg" alt="" srcset="" />
          ) : (
            <img src="/images/homepage.svg" alt="" srcset="" />
          )}
        </figure>
        <p className="title">Take your Quiz!</p>
        <Link to={localStorage.token ? "/quizsets" : "/users/login"}>
          {localStorage.token ? (
            <button className="button_signin started is-success">
              GET STARTED
            </button>
          ) : (
            <button className="button_signup started is-success">
              GET STARTED
            </button>
          )}
        </Link>
      </div>
    </>
  );
};

export default HomePage;
