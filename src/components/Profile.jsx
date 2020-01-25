import React from "react";
import {Link} from 'react-router-dom';
import { AiOutlineLogout } from "react-icons/ai";

const Profile = props => {
  return (
    <>
      <center>
        <div className="my_tile">
          <article className="tile is-child notification is-info">
            <p className="title">{props.user.user.username}</p>
            <p className="subtitle">{props.user.user.email}</p>
            <p className="subtitle">
              {props.user.user.isAdmin ? "Admin" : "User"}
            </p>
            <Link to="/">
            <p
              className="title"
              onClick={() => {
                localStorage.clear();
                props.isLogged(false);
              }}
            >
              <AiOutlineLogout />
            </p>
            </Link>
          </article>
        </div>
      </center>
    </>
  );
};

export default Profile;
