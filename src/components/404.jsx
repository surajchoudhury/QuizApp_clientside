import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

const Notfound404 = () => {
  return (
    <center className="not_found_container">
      <figure className="not_found">
        <img src="/images/404.svg" alt="" srcset="" />
      </figure>
      <Link to="/">
        <p className="back_to_home">
          <IoIosArrowBack className="arrow_404" />
          Back to home
        </p>
      </Link>
    </center>
  );
};

export default Notfound404;
