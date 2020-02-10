import React from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineLogout,
  AiOutlineMail,
  AiOutlineFileImage,
  AiOutlineUser
} from "react-icons/ai";
import Loader from "./Loader";
import { FiClipboard } from "react-icons/fi";
// import { MdUpdate } from "react-icons/md";
import { connect } from "react-redux";
import { updateUser } from "../actions";

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      email: null,
      profile: null
    };
  }

  componentDidMount() {
    fetch("/api/v1/user", {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.token
      }
    })
      .then(res => res.json())
      .then(user => {
        if (user.success) {
          this.setState({
            username: user.user.username,
            email: user.user.email,
            profile: user.user.profile
          });
        }
      });
  }

  onChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  updateUser = () => {
    this.props.dispatch(
      updateUser(this.state.username, this.state.email, this.state.profile)
    );
  };
  render() {
    return (
      <>
        {this.props.user ? (
          <div className="profile_container">
            <form className="form_profile">
              <div className="profile_name_pic">
                <figure className="profile_pic">
                  <img
                    className="profile_img"
                    src={this.state.profile}
                    alt=""
                    srcset=""
                  />
                </figure>
                <input
                  onChange={this.onChange}
                  className="input_username"
                  name="username"
                  value={this.state.username}
                />
              </div>
              <AiOutlineUser className="icon_profile1" />
              <span className="profile_user_admin">
                {this.props.user.isAdmin ? "Admin" : "User"}
              </span>
              <div className="icon_input_container">
                <AiOutlineFileImage className="icon_profile" />
                <input
                  onChange={this.onChange}
                  className="input_profilepic input_profile_"
                  value={this.state.profile}
                  name="profile"
                  placeholder="Add a profile pic"
                />
              </div>

              <div className="icon_input_container">
                <AiOutlineMail className="icon_profile" />
                <input
                  onChange={this.onChange}
                  className="input_profile input_profile_"
                  name="email"
                  value={this.state.email}
                />
              </div>
            </form>

            {!this.props.user.isAdmin ? (
              <Link to="/score" className="score_link">
                <FiClipboard className="icon_profile1"/>
                <span className="Profile_score">Score</span>
              </Link>
            ) : null}
            {/* <p onClick={this.updateUser} className="update_user">
              <MdUpdate  />
            </p> */}
            <Link to="/">
              <p
                className="logout"
                onClick={() => {
                  localStorage.clear();
                  this.props.isLogged(false);
                }}
              >
                <AiOutlineLogout />
              </p>
            </Link>
          </div>
        ) : (
          <Loader />
        )}
      </>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    user: users.user && users.user.user
  };
}

export default connect(mapStateToProps)(Profile);
